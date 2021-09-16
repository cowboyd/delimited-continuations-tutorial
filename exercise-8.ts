import { reduce, shift, reset, Prog } from './src';



const capture = shift(function*(k) { return k; })


reduce(function*() {
  function* t(): Prog {
    return yield reset(function*() {
      return `hello ${yield capture} ${yield capture}!`;
    });
  }

  function* hello(robot: string, num: number) {
    return (yield* t())(robot)(num);
  }

  console.log(yield* hello("Johnny", 5));
})

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
