import { Application, NotFoundException } from 'https://deno.land/x/abc@v0.2.11/mod.ts'
import { logger } from 'https://deno.land/x/abc@v0.2.11/middleware/logger.ts'
import { join } from 'https://deno.land/std@v0.42.0/path/mod.ts'
import { serve } from 'https://deno.land/std@v0.42.0/http/server.ts'
import { acceptWebSocket, WebSocket } from 'https://deno.land/std@v0.42.0/ws/mod.ts'
const { readFile, transpileOnly, watchFs, cwd } = Deno

const app = new Application()
app.start({ port: 8887, hostname: '0.0.0.0' })
console.log('Server running at http://127.0.0.1:8887/')

app.use(logger()).get('/*files', async (c) => {
  if (c.path === '/') {
    return c.redirect('/index.html')
  }
  const f = await readFile(join('.', c.path.slice(1)))
  const code = decoder(f)
  if (/\.[j|t]sx?$/.test(c.path)) {
    c.response.headers.set('content-type', 'application/javascript')
    return transform(c.path, code)
  } else if (c.path === '/index.html') {
    const w = await readFile(join('.', 'src/client.js'))
    const cc = decoder(w)
    const html = code + '<script type="module">' + cc + '</script>'
    console.log(html)
    return c.html(html)
  }

  throw new NotFoundException()
})

let timeMap = new Map()

//ws server
const port = '8080'
console.log(`${port}`)
for await (const req of serve(`:${port}`)) {
  const { headers, conn } = req
  acceptWebSocket({
    conn,
    headers,
    bufReader: req.r,
    bufWriter: req.w,
  }).then(
    async (sock: WebSocket): Promise<void> => {
      const it = sock.receive()
      const iter = watchFs('/')
      for await (const event of iter) {
        const path = event.paths[0]
        const timestamp = new Date().getTime()
        const oldTime = timeMap.get(path)
        // console.log(oldTime, timestamp)
        if (oldTime + 250 < timestamp || !oldTime) {
          sock.send(
            JSON.stringify({
              timestamp
            })
          )
        }
        timeMap.set(path, timestamp)
      }
    }
  )
}

async function transform(rootName: string, source: string) {
  const result = await transpileOnly(
    {
      [rootName]: source,
    },
    {
      strict: false,
      jsx: 'react',
      jsxFactory: 'h',
    }
  )

  return result[rootName].source
}

function decoder(b: Uint8Array) {
  return new TextDecoder().decode(b)
}
