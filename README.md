# deku

No-bundle Dev Server for morden ES modules.


[![tag](https://img.shields.io/github/tag/yisar/deku.svg)](https://github.com/yisar/deku)
[![Build Status](https://github.com/yisar/deku/workflows/ci/badge.svg?branch=master)](https://github.com/yisar/deku/actions)
[![license](https://img.shields.io/github/license/yisar/deku.svg)](https://github.com/yisar/deku)
[![tag](https://img.shields.io/badge/deno-v0.42.0-green.svg)](https://github.com/denoland/deno)

### Install

```shell
deno install -A --unstable deku 'https://deno.land/x/deku/mod.ts'
```

### Use

```shell
$ deku create <project-name> // create a fre app
$ cd <project-name>
$ deku install // install modules from deku.json
$ deku // run
```

### Hot reload

* Js(x)

There are two kinds of js, one is fre component, another is function.

And component will rerender, function will cause reload.

So, it's better that one component into one file, rather than maxing.

* Css

There are also two kinds of style, one is in fre component, another is inline html.

In the component, use css-in-js libraries, or add link to index.html, both them will rerender.


### Todo

- [x] hot reload

- [x] cli

### How is this different form viet or pika?

This is for Fre but not Vue, and use deno instead of node without node_modules.

This use deno compiler for compiling JSX instead of vue compiler.

So, no bundle, no JSX compiler, no node……

### License

MIT ©yisar inspired by vite.
