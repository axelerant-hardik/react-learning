import { useState } from "react"
import { TodoList } from "./TodoList"

export function TodoForm() {
  const [todoItems, setTodoItems] = useState([])

  function addTodoItem() {
    const itemValue = document.getElementById("todo-input").value

    // Check value is not empty
    if (itemValue == undefined) return

    const newItem = [
      ...todoItems,
      { id: crypto.randomUUID(), value: itemValue, completed: false },
    ]
    setTodoItems(newItem)

    // Unset value of input field once added.
    document.getElementById("todo-input").value = ""
  }

  function toggleTodo(id, completed) {
    setTodoItems((items) => {
      return items.map((item) => {
        if (item.id === id) {
          return { ...item, completed }
        }
        return item
      })
    })
  }

  function deleteTodo(id, completed) {
    setTodoItems((items) => {
      return items.filter((item) => {
        return item.id !== id
      })
    })
  }

  return (
    <>
      <ul id="list">
        {todoItems.map((val) => {
          return (
            <TodoList
              key={val.id}
              {...val}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          )
        })}
      </ul>
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input type="text" id="todo-input" />
        <button onClick={addTodoItem}>Add Todo</button>
      </div>
    </>
  )
}
