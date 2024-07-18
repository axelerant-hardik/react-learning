import { useEffect, useState } from "react"
import { UserList } from "./UserList"

function App() {
  const [users, setUsers] = useState()
  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setUsers(undefined)
    setError(undefined)
    setLoading(true)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.status === 200 ? res.json() : Promise.reject("Error!")
      })
      .then((data) => setUsers(data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [])

  let hasErrors = error != null
  let showLoading = isLoading && !hasErrors

  return (
    <>
      <h1>Users List</h1>
      <ul>
        {hasErrors && error}
        {!hasErrors && showLoading && <h2>Loading...</h2>}
        {!hasErrors &&
          !showLoading &&
          users.map((user) => {
            return <UserList key={user.id} name={user.name} />
          })}
      </ul>
    </>
  )
}

export default App
