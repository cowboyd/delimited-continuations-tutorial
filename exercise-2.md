In the following expressions, identify the delimited continuation and
its type.

1. `5 * reset (fun () -> [2 * 3] + 3 * 4)`

    __continuation__: `[.] + 3 * 4`

    __type__: `int -> int`

1. `reset (fun () -> if [2 = 3] then "hello" else "hi") ^ " world"`

    __continuation__: `(if [.] then "hello" else "hi")`

    __type__: `boolean -> string`

1. `fst (reset (fun () -> let x = [1 + 2] in (x, x)))`

    __continuation__: `let x = [.] in (x,x)`

    __type__: `int -> (int,int)`

1. `string_length (reset (fun () -> "x" ^ string_of_int [3 + 1]))`

    __continuation__: `"x" ^ string_of_int [.]`

    __type__: `int -> string`
