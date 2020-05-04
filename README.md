# deku

No-bundle Dev Server for morden ES modules.

### Install

```shell
deno install -A --unstable deku 'https://deno.land/x/deku/mod.ts'
```

### Use

```shell
deku create my-app // create a fre app
```

```shell
deku install // install modules from deku.json
```

```shell
deku // run
```

### Hot reload

if you export default a component, it will rerender only.

Any other case it will reload.

### todo

- [x] hot reload

- [ ] cli

#### How is this different form viet?

This is for Fre but not Vue, and use deno instead of node without node_modules.

This use deno compiler for compiling JSX instead of vue compiler.

So, no bundle, no JSX compiler, no node……

### License

MIT ©yisar inspired by vite.
