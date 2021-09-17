import { reduce, shift } from './src';

console.log(reduce(function*() {
  return 1 + (yield shift(function*(k) {
    return 2 * k(3);
  }))
}));

console.log(reduce(function*() {
  //A
  return 'hello ' + (yield shift(function*(k) { // k continues A
    return 'say ' + k('world');
  }))
}))
