import { baseApi } from "./base"

export function getTodos(options) {
  return baseApi.get("todos", options).then((res) => res.data)
}

export function getUserTodos(uid, options) {
  return baseApi.get(`todos?userId=${uid}`, options).then((res) => res.data)
}
