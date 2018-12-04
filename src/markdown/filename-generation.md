---
path: '/introduction/filename-generation'
title: 'Filename Generation'
group: introduction
order: 1
---

Otherwise known as _globbing_, filename generation is quite extensive in zsh. Of course, it has all the basics:

```bash
% ls
Makefile   file.pro   foo.o      main.o     q.c        run234     stuff
bar.o      foo        link       morestuff  run123     run240     sub
file.h     foo.c      main.h     pipe       run2       run303

% ls *.c
foo.c  q.c

% ls *.[co]
bar.o   foo.c   foo.o   main.o  q.c

% ls foo.?
foo.c  foo.o

% ls *.[^c]
bar.o   file.h  foo.o   main.h  main.o

% ls *.[^oh]
foo.c  q.c
```

Also, if the `EXTENDEDGLOB` option is set, some new features are activated. For example, the `^` character negates the pattern following it:

```bash
% setopt extendedglob

% ls -d ^*.c
Makefile   file.pro   link       morestuff  run2       run303
bar.o      foo        main.h     pipe       run234     stuff
file.h     foo.o      main.o     run123     run240     sub

% ls -d ^*.*
Makefile   link       pipe       run2       run240     stuff
foo        morestuff  run123     run234     run303     sub

% ls -d ^Makefile
bar.o      foo        link       morestuff  run123     run240     sub
file.h     foo.c      main.h     pipe       run2       run303
file.pro   foo.o      main.o     q.c        run234     stuff

% ls -d *.^c
.rhosts   bar.o     file.h    file.pro  foo.o     main.h    main.o
```
