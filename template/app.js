import { h, useState } from './web_modules/fre.js'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div class='container'>
      <h1>hello Deku!</h1>
      <button onClick={() => setCount(count + 1)}>click: {count}</button>
    </div>
  )
}
