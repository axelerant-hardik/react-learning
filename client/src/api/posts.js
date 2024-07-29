import { baseApi } from "./base"

// Get all posts.
export function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data)
}

// Get a single post.
export function getPost(id, options) {
  return baseApi.get(`posts/${id}`, options).then((res) => res.data)
}

// Get all posts associated with a user.
export function getPostsByUser(uid, options) {
  return baseApi.get(`posts?userId=${uid}`, options).then((res) => res.data)
}

// Create a new post
export function addPost(payload, signal) {
  return baseApi
    .post(
      "posts",
      {
        ...payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      }
    )
    .then((res) => res.data)
}

// Edit a post
export function editPost(id, payload, signal) {
  return baseApi
    .put(
      `posts/${id}`,
      {
        ...payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
      }
    )
    .then((res) => res.data)
}
