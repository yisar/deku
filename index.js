import { h, render, useState } from './fre.js'
import A from './a.js'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <A/>
      <h1>hello fre</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

render(<App />, document.body)