import { h, useState } from './web_modules/fre.js'
import A from './a.js'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <A/>
      <h1>fre!</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}