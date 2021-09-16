import { reduce, reset, shift } from './src';

function* times([first, ...rest]: number[]): any {
  console.log({ first, rest });
  if (first === 0) {
    return yield shift(function*() {
      return 0;
    });
  } else if (first == null) {
    return 1;
  } else {
    return first * (yield* times(rest));
  }
}

let result = reduce(function* main() {
  return yield reset(function*() {
    return yield* times([8,0,5,2,3]);
  });
});

console.log({ result });

//let prog = main();
// while (true) {
//   let next = prog.next();
//   console.dir(next, { depth: 3 });
//   if (next.done) {
//     break;
//   }
// }
