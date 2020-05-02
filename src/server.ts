import { Application, NotFoundException } from 'https://deno.land/x/abc@v0.2.11/mod.ts'
import { logger } from 'https://deno.land/x/abc@v0.2.11/middleware/logger.ts'
import { join } from 'https://deno.land/std@v0.42.0/path/mod.ts'
const { readFile, transpileOnly } = Deno

const app = new Application()
app.start({ port: 8887, hostname: '0.0.0.0' })
console.log('Server running at http://127.0.0.1:8887/')

app.use(logger()).get('/*files', async c => {
  if (c.path === '/') {
    return c.redirect('/index.html')
  }
  const f = await readFile(join('.', c.path.slice(1)))
  if (/\.[j|t]sx?$/.test(c.path)) {
    c.response.headers.set('content-type', 'application/javascript')
    return c.string(await transform(c.path, decoder(f)))
  } else if (c.path === '/index.html') {
    return c.htmlBlob(f)
  }

  throw new NotFoundException()
})

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
