import { pipe } from "fp-ts/lib/function"
import {match} from 'ts-pattern';

const plus = (b: number) => (a: number) => a + b

const minus = (b: number) => (a: number) => a - b

const result = pipe(
  2,
  plus(2),
  minus(1),
)

const matched = match(result).with(3, () => 'three').otherwise(() => 'not three')

console.log(matched);
