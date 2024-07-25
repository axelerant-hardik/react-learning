// Custom hook to fetch data from a url.
export async function useFetch(url, signal) {
  const res = await fetch(url, signal)
  if (res.status === 200) {
    return res.json()
  } else {
    return Promise.reject(res)
  }
}
