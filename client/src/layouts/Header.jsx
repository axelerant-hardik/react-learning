import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom"
import { Navbar } from "../components/Navbar"

export function Header() {
  const { state } = useNavigation()

  return (
    <>
      <Navbar />
      {state === "loading" ? (
        <div className="loading-spinner"></div>
      ) : undefined}
      <div
        className={`container ${state === "loading" ? "loading" : undefined}`}
      >
        <ScrollRestoration />
        <Outlet />
      </div>
    </>
  )
}
