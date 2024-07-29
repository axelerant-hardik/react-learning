import { Link, useLoaderData } from "react-router-dom"
import { FilterPosts } from "../components/actions/FilterPosts"

export function Posts() {
  const { posts, searchParams } = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        Posts
        {/* Add button to add a new post. */}
        <div className="title-btns">
          <Link to="add" className="btn btn-outline">
            New
          </Link>
        </div>
      </h1>
      <FilterPosts {...searchParams} />
      <div className="card-grid">
        {posts.map((post) => {
          return (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
