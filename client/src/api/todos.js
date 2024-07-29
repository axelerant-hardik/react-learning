import { baseApi } from "./base"

// Get all todos.
export function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data)
}

// Get all todos associated with a user.
export function getUserTodos(uid, options) {
  return baseApi.get(`todos?userId=${uid}`, options).then((res) => res.data)
}
