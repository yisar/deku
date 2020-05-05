import { commonServer, hmrServer } from './src/server.ts'
import { createRp } from './src/cli.ts'
const { args } = Deno

if (args.length > 0) {
  createRp(args)
} else {
  commonServer()
  hmrServer()
}
