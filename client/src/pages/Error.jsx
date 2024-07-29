import { useRouteError } from "react-router-dom"

export function Error() {
  const error = useRouteError()

  return (
    <div className="error">
      <h2>The page encountered an unexpected error.</h2>
      {import.meta.env.MODE != "production" && (
        <>
          <pre>{error.stack}</pre>
        </>
      )}
    </div>
  )
}
