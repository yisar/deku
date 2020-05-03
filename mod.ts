import { commonServer, hmrServer, } from './src/server.ts'
import { createRp } from './src/cli.ts'
const { args } = Deno

createRp(args)
commonServer()
hmrServer()