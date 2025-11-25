import React, { useEffect, useRef } from "react" // ⬅️ added useRef
import { useLocation } from "@reach/router" // ⬅️ added useLocation
import Navbar from "./Navbar"
import Footer from "./Footer"
import "normalize.css"
import "../assets/css/main.css"

const Layout = ({ children }) => {
  // ⬅️ NEW: ref so we can move focus to <main> after navigation
  const mainRef = useRef(null)

  // ⬅️ NEW: gives us the current route (pathname) in Gatsby
  const location = useLocation()

  // ✅ your existing "first visit / visited" body-class logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisitedBefore")
      const body = document.body

      body.classList.remove("first-visit", "visited")

      if (!hasVisited) {
        body.classList.add("first-visit")
        localStorage.setItem("hasVisitedBefore", "true")
      } else {
        body.classList.add("visited")
      }
    }
  }, [])

  // ⬅️ NEW: move focus to <main> whenever the route changes
  useEffect(() => {
    if (!mainRef.current) return
    // tabIndex is already -1 in the JSX, so we just focus
    mainRef.current.focus()
  }, [location.pathname])

  return (
    <>
      {/* ⬅️ UPDATED: make id + href name more semantic & consistent */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      {/* ⬅️ UPDATED: id must match skip-link href; ref used for focus */}
      <main id="main-content" ref={mainRef} tabIndex="-1">
        {children} {/* Render children immediately for proper SSR and SEO */}
      </main>

      <Footer />
    </>
  )
}

export default Layout
