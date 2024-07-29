import axios from "axios"

// Set up base axios instance.
export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
