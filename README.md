# deku

No-bundle Dev Server for morden ES modules.

### Install

```shell
deno install --allow-net --allow-read --allow-write --unstable deku 'https://deno.land/x/deku/mod.ts'
```

### Use

#### create

```shell
deku create my-app // create a fre app
```

#### install

```shell
deku install // install modules from deku.json
```

#### run

```shell
deku
```

### todo

- [x] hot reload

- [] cli

#### How is this different form viet?

This is for Fre but not Vue, and use deno instead of node without node_modules.

This use deno compiler for compiling JSX instead of vue compiler.

So, no bundle, no JSX compiler, no node……

### License

MIT ©yisar inspired by vite.
