import React, { useEffect } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import "normalize.css"
import "../assets/css/main.css"

const Layout = ({ children }) => {
  useEffect(() => {
    // This ensures we're only running browser-side logic
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("hasVisitedBefore")
      const body = document.body

      // Remove any previous classes
      body.classList.remove("first-visit", "visited")

      if (!hasVisited) {
        body.classList.add("first-visit")
        localStorage.setItem("hasVisitedBefore", "true")
      } else {
        body.classList.add("visited")
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      {children} {/* Render children immediately for proper SSR and SEO */}
      <Footer />
    </>
  )
}

export default Layout
