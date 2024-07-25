import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react"

export function Post() {
  const [post, setPost] = useState({})
  const [user, setUser] = useState({})
  const [comments, setComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const controller = new AbortController()

  useEffect(() => {
    setIsLoading(true)

    // Get data for a single post and set it in state.
    useFetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, controller.signal)
      .then((data) => {
        setPost(data)

        // Fetch user.
        useFetch(
          `${import.meta.env.VITE_API_URL}/users/${data.userId}`,
          controller.signal
        )
          .then((userData) => setUser(userData))
          .catch((e) => {
            if (e?.name === "AbortError") return
          })

        // Fetch comments on this post.
        useFetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}/comments`,
          controller.signal
        )
          .then((comments) => {
            setComments(comments)
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
      {Object.keys(post).length > 0 ? (
        <>
          {isLoading ? <div className="loading-spinner"></div> : undefined}
          <div className={classes.join(" ")}>
            <h1 className="page-title">{post.title}</h1>
            <span className="page-subtitle">
              By: <Link to={`/users/${post.userId}`}>{user.name}</Link>
            </span>
            <div>{post.body}</div>
            {comments.length > 0 ? (
              <>
                <h3 className="mt-4 mb-2">Comments</h3>
                <div className="card-stack">
                  {comments.map((comment) => {
                    return (
                      <div className="card" key={comment.id}>
                        <div className="card-body">
                          <div className="text-sm mb-1">{comment.email}</div>
                          {comment.body}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : undefined}
          </div>
        </>
      ) : (
        <p>No posts found.</p>
      )}
    </>
  )
}
