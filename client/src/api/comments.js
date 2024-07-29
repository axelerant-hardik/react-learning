import { baseApi } from "./base"

// Get all comments on a post.
export function getCommentsOnPost(id, options) {
  return baseApi.get(`posts/${id}/comments`, options).then((res) => res.data)
}
