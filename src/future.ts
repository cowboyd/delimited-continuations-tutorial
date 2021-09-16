import { reduce, reset, shift } from '.';

export type State = 'pending' | 'errored' | 'completed' | 'halted';

export type Value<T> =
  | { state: 'errored'; error: Error }
  | { state: 'completed'; value: T }
  | { state: 'halted' };

export interface Consumer<T> {
  (value: Value<T>): void;
}

export interface Future<T>{
  state: State;
  consume(consumer: Consumer<T>): void;
}

export interface NewFuture<T> {
  future: Future<T>;
  produce(value: Value<T>): void;
  resolve(value: T): void;
  reject(error: Error): void;
  halt(): void;
}

export function createFuture<T>(): NewFuture<T> {
  return reduce(function*() {
    let consumers: Consumer<T>[] = [];
    let value: Value<T>;

    let produce = yield reset(function*() {
      value = yield shift(function*(k) { return k; });
      yield* notify(value);
    });

    let consume = yield reset(function*() {
      while (true) {
        let consumer: Consumer<T> = yield shift(function*(k) { return k; });
        consumers.push(consumer);
        if (value) {
          yield* notify(value);
        }
      }
    });

    function* notify(value: Value<T>) {
      for (let consumer = consumers.shift(); consumer; consumer = consumers.shift()) {
        yield* (function*() { consumer(value)})();
      }
    }

    return {
      future: {
        get state() {
          return value ? value.state : 'pending';
        },
        consume
      },
      produce,
      consume,
      resolve: (value: T) => produce({ state: 'completed', value }),
      reject: (error: Error) => produce({ state: 'errored', error }),
      halt: () => produce({ state: 'halted' })
    }
  });
}

let { future, resolve } = createFuture<number>();

future.consume(v => console.log('first', v));
future.consume(v => {
  console.log('second', v);
  future.consume(v => console.log('second.first', v));
});
future.consume(v => console.log('third', v));

resolve(25);

future.consume(v => console.log('fourth', v));

resolve(88);

future.consume(v => console.log('fifth', v));
