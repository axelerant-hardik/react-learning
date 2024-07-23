import { useContext } from "react"
import { TodoItem } from "./TodoItem"
import { TodoContext } from "./Todo"

export function TodoList() {
  const { todos } = useContext(TodoContext)

  return (
    <ul id="list">
      {todos.map((item) => {
        return <TodoItem key={item.id} {...item} />
      })}
    </ul>
  )
}
