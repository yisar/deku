import { serve } from 'https://deno.land/std@v0.42.0/http/server.ts'
import * as path from 'https://deno.land/std@v0.42.0/path/mod.ts'
// import * as path from 'https://deno.land/std/path/mod.ts'

const { readFile, cwd } = Deno

const s = serve({ port: 7000 })
for await (const req of s) {
  const { url } = req

  if (url === '/') {
    const data = await readFile('./index.html')
    req.respond({ body: data })
  } else if (url.endsWith('.js')) {
    const filepath = cwd() + url
    const data = await readFile(filepath)
    const headers = new Headers()
    headers.set('content-type', 'application/javascript')
    
    req.respond({ body: data, headers })
  } else {
    req.respond({ body: '404' })
  }
}
