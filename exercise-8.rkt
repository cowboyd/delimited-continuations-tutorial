#lang racket
(require racket/control)

(define (f) (reset (string-append "hello "(shift k (lambda (x) (k x))) "!")))

((f) "world")


