import { scheduleWork, h, options } from './fre.js'
const wsp = location.protocol === 'https:' ? 'wss' : 'ws'
const ws = new WebSocket(`${wsp}://localhost:4000`)

options.updateHook = WIP =>{
  WIP.type.fiber = WIP
}

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
        if (m.fiber) {
          const fiber = m.fiber
          import(`${path}?t=${timestamp}`).then(mods => {
            const vdom = h(mods[name], fiber.props)
            let c = { ...fiber, ...vdom }
            scheduleWork(c)
          })
        } else {
          if (m.length = 0) {
            // no args, execute it.
            import(`${path}?t=${timestamp}`).then((mods) => mods[name]())
          } else {
            window.location.reload()
            break
          }
        }
      }
    })
  }
}

ws.onerror = (e) => console.error(e)
ws.onopen = () => console.log('opened.')
ws.onclose = () => console.log('closed.')