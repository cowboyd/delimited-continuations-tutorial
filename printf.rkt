#lang racket
(require racket/control)

(define (f) (reset (string-append (shift k (lambda () (k "hello"))) " world")))

((f))


