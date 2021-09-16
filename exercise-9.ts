// ;; This implements the state monad described in section
// ;; 2.10 They work, and I have no idea how yet

// (define (get)
//  (shift k (λ (state) ((k state) state))))

// (define (tick)
//  (shift k (λ (state) ((k) (+ 1 state)))))

// (define (run-state thunk)
//  ((reset (let ((result (thunk))) (λ (state) result))) 0))

// (run-state
//  (λ ()
//   (tick)
//   (tick)
//   (let ((a (get)))
//    (tick)
//    (- (get) a))))

// (run-state
//  (λ ()
//   (-
//     (begin (tick) (get))
//    (begin (tick) (get))
//   )))

import { Prog, reduce, reset, shift } from './src';

reduce(function* () {
  function* get(): Prog {
    return yield shift(function*(k) {
      return (state: number) => k(state)(state);
    })
  }

  function* tick(): Prog {
    return yield shift(function*(k) {
      return (state: number) => k(undefined)(state + 1);
    })
  }

  function* runState(thunk: () => Prog): Prog {
    return ((yield reset(function*() {
      let result = yield* thunk();
      return () => result;
    })) as unknown as Function)(0);
  }

  yield* runState(function*() {
    yield* tick();
    yield* tick();
    let a = yield* get();
    yield* tick();
    return yield* tick();
  });

  yield* runState(function*() {
    yield* tick();
    let a = yield* get();

    yield* tick();
    let b = yield* get();

    console.log(a - b);
  })
})
