import { writeFileStr, ensureDir, readJson } from 'https://deno.land/std@v0.42.0/fs/mod.ts'
import * as path from 'https://deno.land/std@v0.42.0/path/mod.ts'
import { green } from 'https://deno.land/std@v0.42.0/fmt/colors.ts'

const { cwd, exit } = Deno

const url = 'https://deno.land/x/deku'
const queue: Promise<unknown>[] = []

export async function createRp(args: string[]) {
  if (args[0] === 'create') {
    const localPath = path.join('./', cwd(), args[1])
    await ensureDir(localPath)
    const files = ['index.html', 'deku.json', 'index.js']
    files.forEach((file) => {
      const rp = `${url}/template/${file}`
      const lp = path.join(localPath, file)
      const p = fetch(rp)
        .then((res) => res.text())
        .then((data) => writeFileStr(lp, data))
        .then(() => console.log(`${green('Create')} ${lp}`))
      queue.push(p)
    })
    await Promise.all(queue)
  } else if (args[0] === 'install') {
    const data = (await readJson('./deku.json')) as Deku
    const localPath = path.join('./', cwd(), 'web_modules')
    await ensureDir(localPath)
    for (const mod in data.modules) {
      const url = data.modules[mod]
      const wm = path.join(localPath, mod + '.js')
      console.log(wm)
      const p = fetch(url)
        .then((res) => res.text())
        .then((data) => writeFileStr(wm, data))
        .then(() => console.log(`${green('Download')} ${wm}`))
      queue.push(p)
    }
    await Promise.all(queue)
  }
  exit(1)
}

type Deku = { modules: Record<string, string> }
