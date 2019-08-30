import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import { TagsList, Tag } from '../components/tags';

const BlogIndex = (props: any) => {
  const { data, location } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const { tags } = node.frontmatter;
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                style={{ boxShadow: `none`, textDecoration: 'none' }}
                to={node.fields.slug}
              >
                {title}
              </Link>
            </h3>
            <div>
              <small>{node.frontmatter.date}</small>
            </div>
            <TagsList>
              {tags.map((tag: string, i: number) => {
                return (
                  <Tag key={i} _key={i} data={tags}>
                    {tag}
                  </Tag>
                );
              })}
            </TagsList>

            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/(blog)/.*.md$/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          id
          frontmatter {
            title
            tags
            description
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
