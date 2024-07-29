import { Navigate, createBrowserRouter, redirect } from "react-router-dom"
import { Posts } from "./pages/Posts"
import { Users } from "./pages/Users"
import { Todos } from "./pages/Todos"
import { Header } from "./layouts/Header"
import {
  addPost,
  editPost,
  getPost,
  getPosts,
  getPostsByUser,
} from "./api/posts"
import { getUser, getUsers } from "./api/users"
import { getTodos, getUserTodos } from "./api/todos"
import { PostItem } from "./components/PostItem"
import { getCommentsOnPost } from "./api/comments"
import { UserItem } from "./components/UserItem"
import { Error } from "./pages/Error"
import { AddPost } from "./components/actions/AddPost"
import { EditPost } from "./components/actions/EditPost"
import { validatePostFormFields } from "./validators"

// Define the routes.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { path: "*", element: <h1>404 - Page not found</h1> },
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "/posts",
            children: [
              {
                index: true,
                element: <Posts />,
                loader: async ({ request: { signal, url } }) => {
                  const searchParams = new URL(url).searchParams
                  const searchKeyword = searchParams.get("query") || ""
                  const author = searchParams.get("userId") || ""
                  const filterParams = { q: searchKeyword }
                  if (author !== "") {
                    filterParams.userId = author
                  }

                  const posts = await getPosts({ signal, params: filterParams })

                  return { posts: posts, searchParams: filterParams }
                },
              },
              {
                path: ":id",
                element: <PostItem />,
                loader: async ({ request: { signal }, params }) => {
                  const comments = getCommentsOnPost(params.id, { signal })
                  const post = await getPost(params.id, { signal })
                  const user = getUser(post.userId, { signal })
                  return { comments: await comments, post, user: await user }
                },
              },
              {
                path: "add",
                element: <AddPost />,
                action: async ({ request }) => {
                  const formData = await request.formData()

                  // Validate form fields.
                  const title = formData.get("title")
                  const body = formData.get("body")
                  const userId = formData.get("userId")
                  const errors = validatePostFormFields({ title, body, userId })
                  if (Object.keys(errors).length > 0) {
                    return errors
                  }

                  const payload = { title, body, userId }
                  const newPost = await addPost(payload, request.signal)

                  return redirect(`/posts/${newPost.id}`)
                },
              },
              {
                path: ":id/edit",
                element: <EditPost />,
                loader: ({ request: { signal }, params }) => {
                  return getPost(params.id, { signal })
                },
                action: async ({ request, params }) => {
                  const formData = await request.formData()

                  // Validate form fields.
                  const title = formData.get("title")
                  const body = formData.get("body")
                  const userId = formData.get("userId")
                  const errors = validatePostFormFields({ title, body, userId })
                  if (Object.keys(errors).length > 0) {
                    return errors
                  }

                  const payload = { title, body, userId }
                  const post = await editPost(
                    params.id,
                    payload,
                    request.signal
                  )

                  return redirect(`/posts/${params.id}`)
                },
              },
            ],
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                element: <Users />,
                loader: ({ request: { signal } }) => {
                  return getUsers({ signal })
                },
              },
              {
                path: ":id",
                element: <UserItem />,
                loader: async ({ request: { signal }, params }) => {
                  const user = getUser(params.id, { signal })
                  const posts = getPostsByUser(params.id, { signal })
                  const todos = getUserTodos(params.id, { signal })

                  return {
                    user: await user,
                    posts: await posts,
                    todos: await todos,
                  }
                },
              },
            ],
          },
          {
            path: "/todos",
            element: <Todos />,
            loader: ({ request: { signal } }) => {
              return getTodos({ signal })
            },
          },
        ],
      },
    ],
  },
])
