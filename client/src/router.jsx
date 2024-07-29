import { Navigate, createBrowserRouter } from "react-router-dom"
import { Posts } from "./pages/Posts"
import { Users } from "./pages/Users"
import { Todos } from "./pages/Todos"
import { Header } from "./layouts/Header"
import { getPost, getPosts, getPostsByUser } from "./api/posts"
import { getUser, getUsers } from "./api/users"
import { getTodos, getUserTodos } from "./api/todos"
import { PostItem } from "./components/PostItem"
import { getCommentsOnPost } from "./api/comments"
import { UserItem } from "./components/UserItem"
import { Error } from "./pages/Error"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
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
            loader: ({ request: { signal } }) => {
              return getPosts({ signal })
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
])
