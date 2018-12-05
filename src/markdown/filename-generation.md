---
path: '/introduction/filename-generation'
title: 'Filename Generation'
group: introduction
order: 1
---

### Globbing

Otherwise known as _globbing_, filename generation is quite extensive in zsh. Of course, it has all the basics:

```bash
% ls
Makefile   file.pro   foo.o      main.o     q.c        run234     stuff
bar.o      foo        link       morestuff  run123     run240     sub
file.h     foo.c      main.h     pipe       run2       run303
```

```bash
% ls *.c
foo.c  q.c
```

```bash
% ls *.[co]
bar.o   foo.c   foo.o   main.o  q.c
```

```bash
% ls foo.?
foo.c  foo.o
```

```bash
% ls *.[^c]
bar.o   file.h  foo.o   main.h  main.o
```

```bash
% ls *.[^oh]
foo.c  q.c
```

### Extended Globbing

Also, if the `EXTENDEDGLOB` option is set, some new features are activated. For example, the `^` character negates the pattern following it:

```bash
% setopt extendedglob
% ls -d ^*.c
Makefile   file.pro   link       morestuff  run2       run303
bar.o      foo        main.h     pipe       run234     stuff
file.h     foo.o      main.o     run123     run240     sub
```

```bash
% setopt extendedglob
% ls -d ^*.*
Makefile   link       pipe       run2       run240     stuff
foo        morestuff  run123     run234     run303     sub
```

```bash
% setopt extendedglob
% ls -d ^Makefile
bar.o      foo        link       morestuff  run123     run240     sub
file.h     foo.c      main.h     pipe       run2       run303
file.pro   foo.o      main.o     q.c        run234     stuff
```

```bash
% setopt extendedglob
% ls -d *.^c
.rhosts   bar.o     file.h    file.pro  foo.o     main.h    main.o
```

### Ranges

An expression of the form `<x-y>` matches a range of integers:

```bash
% ls run<200-300>
run234  run240
```

```bash
% ls run<300-400>
run303
```

```bash
% ls run<-200>
run123  run2
```

```bash
% ls run<300->
run303
```

```bash
% ls run<>
run123  run2    run234  run240  run303
```

### Grouping

Grouping is possible:

```bash
% ls (foo|bar).*
bar.o  foo.c  foo.o
```

```bash
% ls *.(c|o|pro)
bar.o     file.pro  foo.c     foo.o     main.o    q.c
```

### Recursive

Also, the string `**/` forces a recursive search of subdirectories:

```bash
% ls -R
Makefile   file.pro   foo.o      main.o     q.c        run234     stuff
bar.o      foo        link       morestuff  run123     run240     sub
file.h     foo.c      main.h     pipe       run2       run303

morestuff:

stuff:
file  xxx   yyy

stuff/xxx:
foobar

stuff/yyy:
frobar
```

```bash
% ls **/*bar
stuff/xxx/foobar  stuff/yyy/frobar
```

```bash
% ls **/f*
file.h            foo               foo.o             stuff/xxx/foobar
file.pro          foo.c             stuff/file        stuff/yyy/frobar
```

```bash
% ls *bar*
bar.o
```

```bash
% ls **/*bar*
bar.o             stuff/xxx/foobar  stuff/yyy/frobar
```

```bash
% ls stuff/**/*bar*
stuff/xxx/foobar  stuff/yyy/frobar
```

### Qualifiers

One can add a number of qualifiers to the end of any of these patterns, to restrict matches to certain file types. A qualified pattern is of the form

> pattern(...)

with single-letter qualifiers inside the parentheses.

```bash
% alias l='ls -dF'
% l *
Makefile    foo*        main.h      q.c         run240
bar.o       foo.c       main.o      run123      run303
file.h      foo.o       morestuff/  run2        stuff/
file.pro    link@       pipe        run234      sub

% l *(/)
morestuff/  stuff/

% l *(@)
link@

% l *(*)
foo*        link@       morestuff/  stuff/

% l *(x)
foo*        link@       morestuff/  stuff/

% l *(X)
foo*        link@       morestuff/  stuff/

% l *(R)
bar.o       foo*        link@       morestuff/  run123      run240
file.h      foo.c       main.h      pipe        run2        run303
file.pro    foo.o       main.o      q.c         run234      stuff/
```
