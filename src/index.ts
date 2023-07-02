import { pipe } from "fp-ts/lib/function"

const plus = (a: number) => (b: number) => a + b

const minus = (a: number) => (b: number) => a - b

const result = pipe(
  2,
  plus(2),
  minus(1),
)

console.log(result)
