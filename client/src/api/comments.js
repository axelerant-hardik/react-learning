import { baseApi } from "./base"

export function getCommentsOnPost(id, options) {
  return baseApi.get(`posts/${id}/comments`, options).then((res) => res.data)
}
