import { useContext, useRef } from "react"
import { TodoContext } from "./Todo"

export function TodoForm() {
  const nameRef = useRef()
  const { addTodo } = useContext(TodoContext)

  function handleSubmit(e) {
    e.preventDefault()

    if (nameRef.current.value == "") return

    addTodo(nameRef.current.value)

    nameRef.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input autoFocus type="text" id="todo-input" ref={nameRef} />
      <button>Add Todo</button>
    </form>
  )
}
