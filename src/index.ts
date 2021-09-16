export type K = (value?: any) => any;

export interface Prog extends Iterator<Control, any, any> {
  [Symbol.iterator](): Iterator<Control, any, any>;
}

export interface Shift {
  type: 'shift';
  block: (k: K) => Prog;
}

export interface Reset {
  type: 'reset';
  block: () => Prog;
}

export type Control = Reset | Shift;

export function reset(block: () => Prog): Reset {
  return { type: 'reset', block };
}

export function shift(block: (k: K) => Prog): Shift {
  return { type: 'shift', block };
}

export function reduce(block: () => Prog, done: K = v => v, value?: unknown): any {
  let prog = block();
  let next = prog.next(value);
  if (next.done) {
    return done(next.value);
  } else {
    let control = next.value;
    if (control.type === 'reset') {
      return reduce(control.block, v => reduce(() => prog, done, v));
    } else {
      let k: K = value => reduce(() => prog, v => v, value);
      return reduce(() => control.block(k), done);
    }
  }
}
