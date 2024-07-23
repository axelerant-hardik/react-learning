import { useReducer } from "react"

function reducer(count, action) {
  switch (action.type) {
    case "INCREMENT":
      return count + 1
    case "DECREMENT":
      return count - 1
    case "RESET":
      return action.payload.resetCount
    default:
      return count
  }
}

export function Counter({ intialCount = 0 }) {
  const [count, dispatch] = useReducer(reducer, intialCount)

  return (
    <>
      <button type="button" onClick={() => dispatch({ type: "DECREMENT" })}>
        -
      </button>
      {count}
      <button type="button" onClick={() => dispatch({ type: "INCREMENT" })}>
        +
      </button>
      <br />
      <button
        type="button"
        onClick={() =>
          dispatch({ type: "RESET", payload: { resetCount: intialCount } })
        }
      >
        RESET
      </button>
    </>
  )
}
