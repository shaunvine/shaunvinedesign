import React from "react"
import SEOmeta from "../components/SEOmeta"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { FaArrowRight } from "react-icons/fa"
import { extractTextFromRaw } from "../utils/extractTextFromRaw"

const options = {
  renderNode: {
    hyperlink: node => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      )
    },
  },
}

const ProjectTemplate = ({ data }) => {
  const {
    title,
    description,
    image,
    imageAltText,
    portfolioCards,
  } = data.contentfulPortfolio
  const pathToImage = getImage(image)

  return (
    <Layout>
      <SEOmeta
        title={title}
        description={description?.raw ? extractTextFromRaw(description.raw) : ""}
      />
      <main className="page">
        <div className="project-page">
          <section className="project-hero">
            <span className="frame">
              <GatsbyImage
                image={pathToImage}
                alt={imageAltText || image?.description || title}
                className="about-img"
              />
            </span>
            <article className="project-info">
              <h2>{title}</h2>
              {description &&
                documentToReactComponents(JSON.parse(description.raw), options)}
            </article>
          </section>

          <section className="portfolio-cards">
            <div className="cards-container">
              {portfolioCards &&
                portfolioCards.map((card, index) => (
                  <div key={index} className="card">
                    {card.card?.gatsbyImageData && (
                      <GatsbyImage
                        image={getImage(card.card.gatsbyImageData)}
                        alt={
                          card.interImageAltText ||
                          card.card?.description ||
                          `Card image ${index + 1}`
                        }
                        className="card-image"
                      />
                    )}
                    <div className="card-description">
                      {documentToReactComponents(
                        JSON.parse(card.cardDescription.raw)
                      )}
                    </div>
                    {card.iterations !== null &&
                      card.iterations !== undefined &&
                      card.iterations !== 0 && (
                        <div className="iterations-count">
                          Iteration: {card.iterations}
                          {index !== portfolioCards.length - 1 && (
                            <FaArrowRight className="iteration-arrow" />
                          )}
                        </div>
                      )}
                  </div>
                ))}
            </div>
          </section>

          <section className="project-content">
            <Link to="/work" className="project-link">
              All Work
            </Link>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query getSinglePortfolio($title: String) {
    contentfulPortfolio(title: { eq: $title }) {
      title
      description {
        raw
      }
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
        description
        title
      }
      imageAltText
      portfolioCards {
        iterations
        interImageAltText
        cardDescription {
          raw
        }
        card {
          gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
          title
          description
        }
      }
    }
  }
`

export default ProjectTemplate
