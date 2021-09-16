import { reduce, shift, reset } from './src';

let t = () => reduce(function*() {
  return yield reset(function*() {
    let one = yield shift(function*(k) { return k; });
    let two = yield shift(function*(k) { return k; });
    return `hello ${one} ${two}!`;
  });
});

function hello(robot: string, num: number): string {
  return t()(robot)(num);
}

console.log(hello("Johnny", 5));

// ;; this template function `f` has two "holes" that we fill in
// ; with captured continuations. The first hole takes a string
// ; and the second an integer. The integer is converted to a string
// ; beforehand.
//   (define (f) (reset (string-append
//                       "hello "
//                       (shift k k)
//                       " "
//                       (shift k (lambda (i) (k (number->string i))))
//                       "!")))

// ;; this function takes multiple arguments and applies them
// ; successively to the continuations captured by the
// ; template function
// ; e.g. (hello "Johnny" 5) = "hello Johnny 5!"
// (define (hello robot num)
//  (((f) robot) num))

// (hello "Johnny" 5)
