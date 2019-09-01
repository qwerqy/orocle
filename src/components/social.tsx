import React from "react"
import { StaticQuery, graphql } from "gatsby"

function Social() {
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const { social } = data.site.siteMetadata

        return (
          <div
            style={{
              display: `flex`,
              flexDirection: `row`,
            }}
          >
            <a href={`https://twitter.com/${social.twitter}`} target="_blank">
              <i
                style={{ fontSize: "1.4rem" }}
                className="fab fa-twitter icon-buffer"
              />
            </a>
            <a href={`https://github.com/${social.github}`} target="_blank">
              <i
                style={{ fontSize: "1.4rem" }}
                className="fab fa-github icon-buffer"
              />
            </a>
          </div>
        )
      }}
    />
  )
}

export default Social

const socialQuery = graphql`
  query socialQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`
