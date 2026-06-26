import React from "react"
import ProjectList from "./ProjectsList"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allContentfulPortfolio(sort: { title: ASC }) {
      nodes {
        id
        title
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
        }
        imageAltText
      }
    }
  }
`

const AllProjects = () => {
  const data = useStaticQuery(query)
  const projects = data.allContentfulPortfolio.nodes
  return (
    <section id="projects-heading" className="portfolio-container">
      <ProjectList projects={projects} />
    </section>
  )
}

export default AllProjects
