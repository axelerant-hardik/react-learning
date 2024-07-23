import { useContext, useRef, useState } from "react"
import { TodoContext } from "./Todo"

export function TodoItem({ id, name, completed }) {
  const [isEditing, setIsEditing] = useState(false)
  const nameRef = useRef()
  const { editTodo, deleteTodo, toggleTodo } = useContext(TodoContext)

  function handleSubmit(e) {
    e.preventDefault()

    editTodo(id, nameRef.current.value)

    setIsEditing(false)
  }

  return (
    <li className="list-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input autoFocus type="text" defaultValue={name} ref={nameRef} />
          <button data-button-edit>Save</button>
        </form>
      ) : (
        <>
          <label className="list-item-label">
            <input
              onChange={(e) => toggleTodo(id, e.target.checked)}
              type="checkbox"
              checked={completed}
              data-list-item-checkbox
            />
            <span data-list-item-text>{name}</span>
          </label>
          <button onClick={() => setIsEditing(true)} data-button-edit>
            Edit
          </button>
          <button onClick={() => deleteTodo(id)} data-button-delete>
            Delete
          </button>
        </>
      )}
    </li>
  )
}
