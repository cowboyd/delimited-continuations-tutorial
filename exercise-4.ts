import { reduce, reset, shift } from './src';


let result = reduce(function*() {
  return yield reset(function*() {
    return yield* times([8,0,5,2,3]);
  });

  function* times([first, ...rest]: number[]): any {
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
});

console.log(result);
