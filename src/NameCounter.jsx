import { useState } from "react"

export function NameCounter() {
  const [name, setName] = useState("Hardik")
  const [age, setAge] = useState(30)

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <div className="age">
        <span onClick={() => setAge((age) => age + 1)}>+</span>
        <span style={{ margin: 20 }}>{age}</span>
        <span onClick={() => setAge((age) => age - 1)}>-</span>
      </div>
      <h1>
        My name is {name} and I am {age} years old
      </h1>
    </div>
  )
}
