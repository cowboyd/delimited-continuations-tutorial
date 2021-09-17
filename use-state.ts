import { reduce, reset, shift, Prog } from './src';

let component = reduce(function*() {
  return yield* render(function*() {
    let [clicks, setClicks] = yield* useCounter();
    let [strokes, setStrokes] = yield* useState(0);
    return {
      clicks,
      strokes,
      onClick: () => setClicks(clicks + 1),
      onKeydown: () => setStrokes(strokes + 1)
    };
  })
})

console.log(component.
  onClick().
  onClick().
  onClick().
  onKeydown().
  onKeydown());

function* useState<T>(initial: T): Prog {
  return yield shift(function*(k) {
    return (states: States) => {
      let current = states.getOrCreate(initial);
      return k([current.get(), current.set])(states);
    }
  });
}

function* useCounter() {
  let [count, setCount] = yield* useState(0);
  return [count, () => setCount(count + 1)];
}

function* render(body: () => Prog): Prog {
  return yield reset(function* renderLoop() {
    let states = createStates();
    while (true) {
      yield shift(function* (k) {
        states.reset(k);
        return (yield reset(function*() {
          let result = yield *body();
          return () => result;
        }))(states)
      });
    }
  })
}

interface States {
  getOrCreate<T>(initial: T): Cell<T>;
  reset(rerender: () => any): void
}
interface Cell<T> {
  get(): T;
  set(t: T): void;
}

function createStates(): States {
  let states: Cell<unknown>[] = [];
  let currentIdx = -1;
  let render = () => { };
  return {
    reset: (rerender) => {
      currentIdx = -1;
      render = rerender;
    },
    getOrCreate<T>(initial: T): Cell<T> {
      if (++currentIdx + 1 > states.length) {
        let value: T = initial;
        states.push({
          get: () => value,
          set: (t: T) => {
            value = t;
            return render();
          }
        });
      }
      return states[currentIdx] as unknown as Cell<T>;
    }
  }
}
