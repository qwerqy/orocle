import React from 'react';
import Layout from '../components/layout';
import SearchForm from '../components/searchForm';
import SearchResults from '../components/searchResult';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Bio from '../components/bio';

const Search = ({ data, location }) => {
  const [results, setResults] = React.useState([]);
  const searchQuery =
    new URLSearchParams(location.search).get('keywords') || '';

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__LUNR__) {
      (window as any).__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(searchQuery);
        const posts = refs.map(({ ref }) => lunr.en.store[ref]);
        console.log(posts);
        setResults(posts);
      });
    }
  }, [location.search]);

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO
        title="Search"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <h1>What are you looking for?</h1>
      <SearchForm query={searchQuery} />
      <SearchResults results={results} query={searchQuery} />
    </Layout>
  );
};

export default Search;

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
