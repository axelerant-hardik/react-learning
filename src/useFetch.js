import { useEffect, useState } from "react"

export function useFetch(url) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    setData(undefined)
    setIsLoading(true)
    setError(false)

    const controller = new AbortController()

    fetch(url, { signal: controller.signal })
      .then((res) => {
        return res.status === 200 ? res.json() : Promise.reject()
      })
      .then((data) => setData(data))
      .catch((e) => {
        if (e?.name === "AbortError") return

        setError(true)
      })
      .finally(() => {
        if (controller.signal.aborted) return
        setIsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [url])

  return {
    data,
    isLoading,
    isError,
  }
}
