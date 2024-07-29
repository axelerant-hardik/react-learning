import { useLoaderData } from "react-router-dom"

export function Todos() {
  const todos = useLoaderData()

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : undefined}
            >
              {todo.title}
            </li>
          )
        })}
      </ul>
    </>
  )
}
