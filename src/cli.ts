import { writeFileStr, ensureDir } from 'https://deno.land/std@v0.42.0/fs/mod.ts'
import * as path from 'https://deno.land/std@v0.42.0/path/mod.ts'
const { cwd } = Deno

const url = 'https://deno.land/x/deku'

export async function createRp(args: string[]) {
  if (args[0] === 'create') {
    const localPath = path.join('./', cwd(), args[1])
    await ensureDir(localPath)
    const rp = `${url}/demo/index.html`
    const lp = path.join(localPath, 'index.html')
    console.log(rp, lp)
    const data = await fetch(rp).then((resp) => resp.text())
    await writeFileStr(lp, data)
  }
}
