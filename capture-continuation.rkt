#lang racket
(require racket/control)

(define (id lst)
  (if (empty? lst)
      (shift k k)
      (cons (car lst) (id (cdr lst)))))

(define x (reset (id `(1 2 3))))

(x `(10 10 10))