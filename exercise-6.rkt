#lang racket
(require racket/control)
(require racket/match)

(define (id lst) (match lst
                   [(list) (shift k k)]
                   [(list-rest head rest) (cons head (id rest))]))


;; Because the continuation is captured at the very
; tail of the recursive step it will take whatever is return by the continuation
; and append it to the list that id was called with.
; e.g. (k `(4 5 6)) = `(1 2 3 4 5 6)
(let ((k (reset (id `(1 2 3)))))
  (k `(4 5 6)))