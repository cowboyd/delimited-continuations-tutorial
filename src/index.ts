export type K = (value: any) => any;

export type Prog = Iterator<Control, any, any> & Iterable<Control>;

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

export function reduce(block: () => Prog, $return: K = () => {}, value?: unknown): any {
  let prog = block();
  let next = prog.next(value);
  if (next.done) {
    $return(next.value);
    return next.value;
  } else {
    let control = next.value;
    if (control.type === 'reset') {
      let returnTo: K = v => reduce(() => prog, $return, v);
      return reduce(control.block, returnTo);
    } else {
      // continues reducing the generator from the shift
      let k: K = value => reduce(() => prog, () => {}, value);
      // reduce shift block and return control to closest reset
      return reduce(() => control.block(k), $return);
    }
  }
}
