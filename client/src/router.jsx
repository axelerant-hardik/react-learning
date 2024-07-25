import {
  Navigate,
  Outlet,
  createBrowserRouter,
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom"
import { Posts } from "./components/Posts"
import { Users } from "./components/Users"
import { Todos } from "./components/Todos"
import { Navbar } from "./components/Navbar"
import { useFetch } from "./hooks/useFetch"
import { Post } from "./components/individual/Post"
import { User } from "./components/individual/User"
import { PageNotFoundError } from "./components/PageNotFoundError"

// Define routes.
export const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "*", element: <PageNotFoundError /> },
      { path: "/", element: <Navigate to="/posts" /> },
      {
        path: "/posts",
        children: [
          {
            index: true,
            element: <Posts />,
            loader: ({ request: { signal } }) =>
              useFetch(`${import.meta.env.VITE_API_URL}/posts`, signal),
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: "/users",
        children: [
          {
            index: true,
            element: <Users />,
            loader: ({ request: { signal } }) =>
              useFetch(`${import.meta.env.VITE_API_URL}/users`, signal),
          },
          {
            path: ":id",
            element: <User />,
          },
        ],
      },
      {
        path: "/todos",
        element: <Todos />,
        loader: ({ request: { signal } }) =>
          useFetch(`${import.meta.env.VITE_API_URL}/todos`, signal),
      },
    ],
  },
])

// Defines nav layout.
function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function ErrorPage() {
  const error = useRouteError()

  let errorMessage
  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.stack
  } else if (typeof error === "string") {
    errorMessage = error
  } else {
    errorMessage = "Unknown error"
  }

  return (
    <>
      <h1>Error - Something went wrong</h1>
      {import.meta.env.MODE !== "production" && <pre>{errorMessage}</pre>}
    </>
  )
}
