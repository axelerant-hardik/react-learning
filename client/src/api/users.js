import { baseApi } from "./base"

// Get all users.
export function getUsers(options) {
  return baseApi.get("users", options).then((res) => res.data)
}

// Get a user.
export function getUser(id, options) {
  return baseApi.get(`users/${id}`, options).then((res) => res.data)
}
