import { useMemo, useState } from "react"
import { validateEmail, validatePassword } from "./validators"

export function StateForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const emailErrors = useMemo(() => {
    return validateEmail(email)
  }, [email])

  const passwordErrors = useMemo(() => {
    return validatePassword(password)
  }, [password])

  function handleSubmit(e) {
    e.preventDefault()

    setIsSubmitted(true)

    if (emailErrors.length === 0 && passwordErrors.length === 0) {
      alert("Success")
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div
        className={`form-group ${
          isSubmitted && emailErrors.length > 0 ? "error" : ""
        }`}
      >
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isSubmitted && emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div
        className={`form-group ${
          isSubmitted && passwordErrors.length > 0 ? "error" : ""
        }`}
      >
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSubmitted && passwordErrors.length > 0 && (
          <div className="msg">{passwordErrors.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}
