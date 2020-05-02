import { h, render, useState } from './fre.js'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>{count}{555}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

render(<App />, document.getElementById('root'))