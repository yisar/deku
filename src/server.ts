import * as path from 'https://deno.land/std@v0.42.0/path/mod.ts'
import { serve } from 'https://deno.land/std@v0.42.0/http/server.ts'
import { acceptWebSocket, WebSocket } from 'https://deno.land/std@v0.42.0/ws/mod.ts'
const { readFile, transpileOnly, watchFs, cwd } = Deno

/* common server */
export async function commonServer() {
  const c = serve({ port: 3000 })
  console.log('server on 3000')
  for await (const req of c) {
    const { url } = req
    if (url === '/') {
      console.log(path.posix.resolve())
      const data = await readFile('./index.html')
      const html = decoder(data) + '<script type="module" src="https://raw.githubusercontent.com/yisar/deku/master/src/client.js"></script>'
      req.respond({ body: html })
    } else if (/\.[j|t]sx?/.test(url)) {
      const filepath = cwd() + url
      try {
        const data = await readFile(filepath)
        const source = decoder(data)
        const code = await transform(url, source)
        const headers = new Headers()
        headers.set('content-type', 'application/javascript')
        req.respond({ body: code, headers })
      } catch (e) {}
    } else {
      req.respond({ body: '404' })
    }
  }
}
/* HMR server */
export async function hmrServer() {
  const w = serve({ port: 4000 })
  console.log('hmr on 4000')
  for await (const req of w) {
    const { headers, conn, r, w } = req
    acceptWebSocket({
      conn,
      headers,
      bufReader: r,
      bufWriter: w,
    })
      .then((sock: WebSocket) => reload(sock))
      .catch((e) => console.error(e))
  }
}

async function transform(rootName: string, source: string) {
  const result = await transpileOnly({ [rootName]: source }, { strict: false, jsx: 'react', jsxFactory: 'h' })
  return result[rootName].source
}

function decoder(b: Uint8Array) {
  return new TextDecoder().decode(b)
}

async function reload(sock: WebSocket) {
  const iter = watchFs(cwd())
  const timeMap = new Map()
  for await (const event of iter) {
    const path = await event.paths[0]
    const timestamp = new Date().getTime()
    const oldTime = timeMap.get(path)
    const name = path.replace(/\\\\/g, '\\').replace(cwd(), '')
    if (oldTime + 250 < timestamp || !oldTime) {
      sock.send(
        JSON.stringify({
          type:'reload',
          timestamp,
          path: name,
        })
      )
    }
    timeMap.set(path, timestamp)
  }
}
