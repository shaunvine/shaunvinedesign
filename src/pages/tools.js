// This page is no longer used — the tools field was removed from Contentful.
// Kept as a stub to prevent Gatsby from 404ing during any lingering references.

import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Layout from "../components/Layout"

const ToolsRedirect = () => {
  useEffect(() => {
    navigate("/work", { replace: true })
  }, [])

  return (
    <Layout>
      <main className="page">
        <p>Redirecting to <a href="/work">Work</a>…</p>
      </main>
    </Layout>
  )
}

export default ToolsRedirect
