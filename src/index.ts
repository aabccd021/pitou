import { pipe } from "fp-ts/lib/function"

const plus = (b: number) => (a: number) => a + b

const minus = (b: number) => (a: number) => a - b

const result = pipe(
  2,
  plus(2),
  minus(1),
)

console.log(result)
