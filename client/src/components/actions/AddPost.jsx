import { Form, Link, useActionData, useNavigation } from "react-router-dom"

export function AddPost() {
  const errors = useActionData() || {}

  // Get form state.
  const { state } = useNavigation()

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form className="form" method="post">
        <div className="form-row">
          <div
            className={`form-group ${
              Object.keys(errors).length > 0 && errors.title != undefined
                ? "error"
                : undefined
            }`}
          >
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">
              {Object.keys(errors).length > 0 && errors.title}
            </div>
          </div>
          <div
            className={`form-group ${
              Object.keys(errors).length > 0 && errors.userId != undefined
                ? "error"
                : undefined
            }`}
          >
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              <option value="">- Select -</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
            <div className="error-message">
              {Object.keys(errors).length > 0 && errors.userId}
            </div>
          </div>
        </div>
        <div className="form-row">
          <div
            className={`form-group ${
              Object.keys(errors).length > 0 && errors.body != undefined
                ? "error"
                : undefined
            }`}
          >
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            <div className="error-message">
              {Object.keys(errors).length > 0 && errors.body}
            </div>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link to="/posts" className="btn btn-outline">
            Cancel
          </Link>
          <button disabled={state === "submitting"} className="btn">
            {state === "submitting" ? "Loading" : "Save"}
          </button>
        </div>
      </Form>
    </>
  )
}
