import { Link, useLoaderData } from "react-router-dom"
import { CommentsCard } from "./CommentsCard"

export function PostItem() {
  const { comments, post, user } = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => {
          return <CommentsCard key={comment.id} {...comment} />
        })}
      </div>
    </>
  )
}
