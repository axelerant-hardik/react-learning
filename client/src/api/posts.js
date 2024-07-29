import { baseApi } from "./base"

export function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data)
}

export function getPost(id, options) {
  return baseApi.get(`posts/${id}`, options).then((res) => res.data)
}
export function getPostsByUser(uid, options) {
  return baseApi.get(`posts?userId=${uid}`, options).then((res) => res.data)
}
