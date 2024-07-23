import { createContext, useEffect, useReducer, useState } from "react"
import { TodoList } from "./TodoList"
import { TodoFilterForm } from "./TodoFilterForm"
import { TodoForm } from "./TodoForm"

const LOCAL_STORAGE_KEY = "todos"
const ACTIONS = {
  ADD: "ADD",
  EDIT: "EDIT",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { id: crypto.randomUUID(), name: payload.name, completed: false },
      ]

    case ACTIONS.EDIT:
      return todos.map((item) => {
        if (item.id === payload.id) {
          return { ...item, name: payload.name }
        }
        return item
      })

    case ACTIONS.DELETE:
      return todos.filter((item) => {
        return item.id !== payload.id
      })

    case ACTIONS.TOGGLE:
      return todos.map((item) => {
        if (item.id === payload.id) {
          return { ...item, completed: payload.completed }
        }
        return item
      })

    default:
      throw new Error("No action found.")
  }
}

export const TodoContext = createContext()

export function Todo() {
  const [filterName, setFilterName] = useState("")
  const [hideCompleted, setHideCompleted] = useState(false)

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) != null) {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const filteredTodos = todos.filter((item) => {
    if (hideCompleted && item.completed) return
    return filterName != "" ? item.name.includes(filterName) : item
  })

  function addTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } })
  }

  function editTodo(id, name) {
    dispatch({ type: ACTIONS.EDIT, payload: { id, name } })
  }

  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE, payload: { id } })
  }

  function toggleTodo(id, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id, completed } })
  }

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      <TodoFilterForm
        name={filterName}
        setName={setFilterName}
        hideCompleted={hideCompleted}
        setHideCompleted={setHideCompleted}
      />
      <TodoList />
      <TodoForm />
    </TodoContext.Provider>
  )
}
