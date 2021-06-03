## Delimited Continuations tutorial

These are my  notes and solutions to exercises from the [delimited
continuations
tutorial](http://pllab.is.ocha.ac.jp/~asai/cw2011tutorial/) from the
Asai laboratory at Ochanomizu University. Because I could not actually
find a way to install OchaOCaml, all of the coding exercises are
implemented in [Racket][racket].

There are some key differences in a Racket implementation however.

### Dynamic Typing

The scheme language variant used in this example is not statically
type-checked, so none of the code-based solutions address the type
based questions in the exercises.

### Algebraic Data Types

The example solutions use the racket [algebraic data type
collection][racket-algebraic]. This just lets you construct (and
deconstruct) product types using positional fields. There is no type
checking, and so anything that goes in will come out.

``` scheme
(data MyType (ConstructorOne ConstructorTwo))

(define one (ConstructorOne 1))
(define two (ConstructorTwo 1 2))

(let ([(ConstructorOne x) one]
      [(ConstructorTwo y z) two])
      (println x)
      (println y)
      (println z))
```

prints:

```
1
2
3
```

### Forms, not functions

The `reset` and `shift` forms in scheme do not take closures as their
argument, they just take a straight up forms  to be evaluated, so
there is no need to create a lambda. For example the following OCaml
example in the tutorial.

``` ocaml
reset (fun () -> 3 + shift (fun _ -> "hello") - 1)
```

Would be written in racket as:

``` scheme
(reset (shift _ "hello") -1)
```

## Exercises

- [exercise 1](./exercise-1.md)
- [exercise 2](./exercise-2.md)
- [exercise 3](./exercise-3.md)
- [exercise 4](./exercise-4.rkt)

[racket]: https://racket-lang.org
[racket-algebraic]: https://docs.racket-lang.org/algebraic/ref.html
