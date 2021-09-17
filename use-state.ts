import { reduce, reset, shift, Prog } from './src';


function* useState<T>(initial: T): Prog {
  return yield shift(function*(k) {
    return (states: States) => {
      let current = states.getOrCreate(initial);
      return k([current.get(), current.set])(states);
    }
  });
}

function* render(body: () => Prog): Prog {
  return yield reset(function* renderLoop() {
    let states = createStates();
    while (true) {
      yield shift(function* (k) {
        states.rerender = k;
        return (yield reset(function*() {
          let result = yield *body();
          return () => result;
        }))(states)
      });
    }
  })
}

let component = reduce(function*() {
  return yield* render(function*() {
    let [count, setCount] = yield* useState(0);
    return {
      count,
      onClick: () => setCount(count + 1)
    };
  })
})

console.log(component.onClick().onClick());

interface States {
  getOrCreate<T>(initial: T): Cell<T>;
  reset(): void
  rerender(): any;
}
interface Cell<T> {
  get(): T;
  set(t: T): void;
}

function createStates(): States {
  console.log('createStates()');
  let states: Cell<unknown>[] = [];
  let currentIdx = -1;

  return {
    rerender: () => {},
    reset: () => currentIdx = -1,
    getOrCreate<T>(initial: T): Cell<T> {
      if (++currentIdx + 1 > states.length) {
        let value: T = initial;
        states.push({
          get: () => value,
          set: (t: T) => {
            value = t;
            return this.rerender();
          }
        });
      }
      return states[currentIdx] as unknown as Cell<T>;
    }
  }
}
