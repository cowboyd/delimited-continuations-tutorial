import { reduce, shift, reset } from './src';

function* id([first, ...rest]: unknown[]): any {
  if (first == null) {
    return yield shift(function*(k) { return k; });
  } else {
    return [first].concat(yield* id(rest));
  }
}

let k = reduce(function*() {
  return yield reset(function*() {
    return yield* id([1,2,3]);
  });
})
console.log(k([4,5,6]));


// (define (id lst) (match lst
//                   [(list) (shift k k)]
//                   [(list-rest head rest) (cons head (id rest))]))


// ;; Because the continuation is captured at the very
// ; tail of the recursive step it will take whatever is return by the continuation
// ; and append it to the list that id was called with.
//   ; e.g. (k `(4 5 6)) = `(1 2 3 4 5 6)

//           (let ((k (reset (id `(1 2 3)))))
// (k `(4 5 6)))
