import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"

export function User() {
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState({})
  const [todos, setTodos] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const controller = new AbortController()

  useEffect(() => {
    setIsLoading(true)

    // Get data for a single post and set it in state.
    useFetch(`${import.meta.env.VITE_API_URL}/users/${id}`, controller.signal)
      .then((data) => {
        setUser(data)

        // Fetch posts associated with this user.
        useFetch(
          `${import.meta.env.VITE_API_URL}/posts?userId=${id}`,
          controller.signal
        )
          .then((posts) => {
            setPosts(posts)
          })
          .catch((e) => {
            if (e?.name === "AbortError") return
          })

        // Fetch todos associated with this user.
        useFetch(
          `${import.meta.env.VITE_API_URL}/todos?userId=${id}`,
          controller.signal
        )
          .then((todos) => {
            setTodos(todos)
          })
          .catch((e) => {
            if (e?.name === "AbortError") return
          })
      })
      .catch((e) => {
        if (e?.name === "AbortError") return
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [id])

  // Set container classes for loading.
  const classes = ["container", isLoading ? "loading" : ""]

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <>
          {isLoading ? <div className="loading-spinner"></div> : undefined}
          <div className={classes.join(" ")}>
            <h1 className="page-title">{user.name}</h1>
            <div className="page-subtitle">{user.email}</div>
            <div>
              <b>Company:</b> {user.company?.name}
            </div>
            <div>
              <b>Website:</b> {user.website}
            </div>
            <div>
              <b>Address:</b>{" "}
              {`${user.address?.street} ${user.address?.suite}, ${user.address?.city}, ${user.address?.zipcode}`}
            </div>
            {posts.length > 0 ? (
              <>
                <h3 className="mt-4 mb-2">Posts</h3>
                <div className="card-grid">
                  {posts.map((post) => {
                    return (
                      <div className="card" key={post.id}>
                        <div className="card-header">{post.title}</div>
                        <div className="card-body">
                          <div className="card-preview-text">{post.body}</div>
                        </div>
                        <div className="card-footer">
                          <Link className="btn" to={`/posts/${post.id}`}>
                            View
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : undefined}
            {todos.length > 0 ? (
              <>
                <h3 className="mt-4 mb-2">Todos</h3>
                <ul>
                  {todos.map((todo) => {
                    return (
                      <li
                        key={todo.id}
                        className={
                          todo.completed ? "strike-through" : undefined
                        }
                      >
                        {todo.title}
                      </li>
                    )
                  })}
                </ul>
              </>
            ) : undefined}
          </div>
        </>
      ) : (
        <p>No user found.</p>
      )}
    </>
  )
}
