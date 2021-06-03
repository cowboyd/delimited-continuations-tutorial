Discard the current continuations and return some values in the
following expressions by replacing [·] with shift (fun _ -> M) for
some M.

1. 5 * reset (fun () -> [·] + 3 * 4)

  __5__: 5 + 3  * 4 = 17

1. reset (fun () -> if [·] then "hello" else "hi") ^ " world"

  __false__: (if true then "hello" else "hi") ^ " world" = "hello world"

1. fst (reset (fun () -> let x = [·] in (x, x)))

  __5__: (let x = 5 in (x, x)) = (5, 5)

1. string_length (reset (fun () -> "x" ^ string_of_int [·]))

  __5__: "x"_ ^ string_of_int 5 = "x5"
