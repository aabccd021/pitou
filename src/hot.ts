import type {
  Server,
  ServerWebSocket,
  WebSocketHandler,
  WebSocketServeOptions,
} from 'bun'

declare global {
  var ws: ServerWebSocket<unknown> | undefined
}

globalThis.ws?.send('reload')

function makeLiveReloadScript(wsUrl: string) {
  return `
<!-- start bun live reload script -->
<script type="text/javascript">
  (function() {
    const socket = new WebSocket("ws://${wsUrl}");
    socket.onmessage = function(msg) {
      if(msg.data === "reload") {
        location.reload()
      }
    };
    console.log('Live reload enabled.');
  })();
</script>
<!-- end bun live reload script -->
`
}

export type PureWebSocketServeOptions<WebSocketDataType> = Omit<
  WebSocketServeOptions<WebSocketDataType>,
  'fetch' | 'websocket'
> & {
  fetch(request: Request, server: Server): Promise<Response> | Response
  websocket?: WebSocketHandler<WebSocketDataType>
}

export interface LiveReloadOptions {
  /**
   * URL path used for websocket connection
   * @default "__bun_live_reload_websocket__"
   */
  readonly wsPath?: string
}

/**
 * Automatically reload html when Bun server hot reloads
 *
 * @param serverOptions Bun's server options
 * @param options Live reload options
 *
 * @returns Bun's server with provided options that live reloads HTML
 *
 * @example
 *```ts
 *import { withHtmlLiveReload } from "bun-html-live-reload";
 *
 *export default withHtmlLiveReload({
 *  fetch: () => {
 *    return new Response("<div>hello world</div>", {
 *      headers: { "Content-Type": "text/html" },
 *    });
 *  },
 *});
 */
export function withHtmlLiveReload<
  WebSocketDataType,
  T extends PureWebSocketServeOptions<WebSocketDataType>,
>(serveOptions: T,
  options?: LiveReloadOptions): WebSocketServeOptions<WebSocketDataType> {
  const hostname = serveOptions.hostname ?? '0.0.0.0'
  const port = serveOptions.port ?? '3000'
  const wsPath = options?.wsPath ?? '__bun_live_reload_websocket__'
  const wsUrl = `${hostname}:${port}/${wsPath}`

  return {
    ...serveOptions,
    fetch: async (req, server) => {
      if (req.url === `http://${wsUrl}`) {
        const upgraded = server.upgrade(req)

        if (!upgraded) {
          return new Response(
            'Failed to upgrade websocket connection for live reload',
            { status: 400 },
          )
        }
        return
      }

      const response = await serveOptions.fetch(req, server)

      if (response.headers.get('Content-Type') !== 'text/html')
        return response

      const originalHtml = await response.text()
      const liveReloadScript = makeLiveReloadScript(wsUrl)
      const htmlWithLiveReload = originalHtml + liveReloadScript

      return new Response(htmlWithLiveReload, response)
    },
    websocket: {
      ...serveOptions.websocket,
      open: async (ws) => {
        globalThis.ws = ws
        await serveOptions.websocket?.open?.(ws)
      },
    },
  }
}
