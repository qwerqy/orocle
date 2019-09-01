/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import { rhythm } from '../utils/typography';
import Social from './social';

function Bio(props) {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(1),
            }}
          >
            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
              }}
            >
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                }}
              >
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={author}
                  style={{
                    marginRight: rhythm(1 / 2),
                    marginBottom: 0,
                    minWidth: 50,
                    borderRadius: `100%`,
                  }}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
                <p style={{ marginBottom: '1rem' }}>
                  Written by <strong>{author}</strong>, An Engineering Lead for
                  Respondents Platform in{' '}
                  <strong>
                    <a href="https://vase.ai" target="_blank">
                      Vase.ai
                    </a>
                  </strong>
                  . He speaks about programming & development.
                </p>
              </div>
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                  justifyContent: 'space-between',
                }}
              >
                {props.showSocial && <Social />}
                {/* <ThemeToggler>
                  {({ theme, toggleTheme }) => (
                    <label
                      style={{
                        marginBottom: rhythm(1.5),
                        display: "flex",
                        alignSelf: "center",
                      }}
                      className="switch"
                    >
                      <input
                        type="checkbox"
                        onChange={e =>
                          toggleTheme(e.target.checked ? "dark" : "light")
                        }
                        checked={theme === "dark"}
                      />
                      <span className="slider round" />
                    </label>
                  )}
                </ThemeToggler> */}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
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
`;

export default Bio;
