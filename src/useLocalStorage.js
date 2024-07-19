import { useEffect, useState } from "react"

export function useLocalStorage(key, initialValue) {
  let finalValue = localStorage.getItem(key)
  if (finalValue == null) {
    finalValue =
      typeof initialValue === "function" ? initialValue() : initialValue
  } else {
    finalValue = JSON.parse(finalValue)
  }

  const [value, setValue] = useState(finalValue)

  useEffect(() => {
    if (value != null) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }, [value, key])

  return [value, setValue]
}
