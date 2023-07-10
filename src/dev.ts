// example.ts
import { withHtmlLiveReload } from './hot'
import { elementToString, h } from './html'

const html = h('html', { lang: 'en' }, [
  h('h1', {}, [
    'Hello, world! yoo',
  ]),
])

const htmlString = `<!DOCTYPE html>\n${elementToString(html)}`

export default withHtmlLiveReload({
  fetch: () => {
    return new Response(htmlString, {
      headers: { 'Content-Type': 'text/html' },
    })
  },
})
