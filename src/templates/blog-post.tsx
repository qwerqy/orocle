import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';
import { TagsList, Tag } from '../components/tags';
import { addPlat, getPlatAmount } from '../utils/platinumHandler';
import PlatWidget from '../components/platWidget';
import SearchForm from '../components/searchForm';

class BlogPostTemplate extends React.Component<any> {
  state = {
    amountOfPlats: 0,
  };

  async componentDidMount() {
    this.setState({
      amountOfPlats: await getPlatAmount(this.props.data.markdownRemark.id),
    });
  }

  handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPlat(this.props.data.markdownRemark.id);
    this.setState({
      amountOfPlats: await getPlatAmount(this.props.data.markdownRemark.id),
    });
  };

  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <SearchForm />
        <h1>{post.frontmatter.title} 📝</h1>
        <br />
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginTop: rhythm(-1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.date} 📅
        </p>
        <TagsList
          style={{
            marginBottom: '1rem',
          }}
        >
          {post.frontmatter.tags &&
            post.frontmatter.tags.map((tag: string, i: number) => {
              return (
                <Tag key={i} _key={i} data={post.frontmatter.tags}>
                  {tag}
                </Tag>
              );
            })}
        </TagsList>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <span>Share this post: </span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              this.props.location.href,
            )}`}
            style={{ margin: '0 1rem' }}
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/share?url=${encodeURIComponent(
              this.props.location.href,
            )}`}
            style={{ margin: '0 1rem' }}
          >
            Twitter
          </a>
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <PlatWidget
          amountOfPlats={this.state.amountOfPlats}
          onClick={this.handleClick}
        />
        <Bio />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
