In the following expressions, identify the next expression to be
evaluated and its continuation by marking the former with [ · ]. What
is the type of the former? Given a value of this type, what is the
type of the value returned by the continuation?


1. `5 * (2 * 3 + 3 * 4)`

   __next expression__: `2 * 3`

   __continuation__: `5 * ([.] + 3 * 4)`

   __next expression type__: int

   __continuation type__: int -> int_

1. `(if 2 = 3 then "hello" else "hi") ^ " world"`

   __next expression__: `(2 = 3)`

   __continuation__: `(if [.] then "hello" else "hi") ^ " world"`

   __next expression type__: boolean

   __continuation type__: boolean -> string

1. `fst (let x = 1 + 2 in (x, x))`

   __next expression__: `(1 + 2)`

   __continuation__: `fst (let x = [.] in (x,x))`

   __next expression type__: boolean

   __continuation type__: boolean -> string

1. `string_length ("x" ^ string_of_int (3 + 1))`

   __next expression__: `(3 + 1)`

   __continuation__: `string_length ("X" ^ string_of_int [.])`

   __next expression type__: int

   __continuation type__: int -> int
