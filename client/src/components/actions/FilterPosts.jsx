import { useEffect, useRef } from "react"
import { Form, useNavigation } from "react-router-dom"

export function FilterPosts({ q, userId }) {
  const queryRef = useRef()
  const authorRef = useRef()

  // Get form state.
  const { state } = useNavigation()

  useEffect(() => {
    queryRef.current.value = q || ""
    authorRef.current.value = userId || ""
  }, [q, userId])

  return (
    <Form method="get" className="form mb-4">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Query</label>
          <input type="search" name="query" id="query" ref={queryRef} />
        </div>
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select type="search" name="userId" id="userId" ref={authorRef}>
            <option value="">Any</option>
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
        </div>
        <button disabled={state === "submitting"} className="btn">
          {state === "submitting" ? "Loading" : "Filter"}
        </button>
      </div>
    </Form>
  )
}
