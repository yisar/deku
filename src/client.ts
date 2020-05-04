import { scheduleWork, h } from './fre.js'
const wsp = location.protocol === 'https:' ? 'wss' : 'ws'
const ws = new WebSocket(`${wsp}://localhost:4000`)
ws.onopen = () => console.log('opened.')
ws.onmessage = (e) => {
  const { path, timestamp } = JSON.parse(e.data)
  if (path.endsWith('.css')) {
    const id = path.substr(1, path.length)
    let links = document.querySelectorAll('link')
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      if (link.getAttribute('href') === id) {
        link.setAttribute('href', id)
      }
    }
  } else {
    import(path).then((mods) => {
      /* 
       Traverse mods, If the mod is component, just rerender; but if the mod is function, reload it.
       So, please make your files just one kind. 
     */
      for (const name in mods) {
        const m = mods[name]
        if (m.WIP) {
          const fiber = m.WIP
          import(`${path}?t=${timestamp}`).then(() => {
            const vdom = h(m, fiber.props)
            let c = { ...fiber, ...vdom }
            scheduleWork(c)
          })
        } else {
          window.location.reload()
          break
        }
      }
    })
  }
}

ws.onerror = (e) => console.error(e)
ws.onclose = (e) => console.log('closed.')
