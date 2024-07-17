import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount((count) => count + 1)
  }
  return <div onClick={handleClick}>{count}</div>
}
