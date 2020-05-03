const wsp = location.protocol === 'https:' ? 'wss' : 'ws'
const ws = new WebSocket(`${wsp}://localhost:4000`)
ws.onopen = () => console.log('opened.')
ws.onmessage = (e) => {
  const data = JSON.parse(e.data)
  console.log(data)
  if (data.type === 'reload') {
    window.location.reload()
  }
}

ws.onerror = (e) => console.error(e)
ws.onclose = (e) => console.log('closed.')
