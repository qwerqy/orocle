require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Qwerqy Devblog.`,
    author: `Amin Roslan`,
    description: `Amin Roslan's Dev Blog`,
    siteUrl: `https://qwerqy,dev`,
    social: {
      twitter: `aminroslan__`,
      github: `qwerqy`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/projects`,
        name: `projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-146837458-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Qwerqy Devblog`,
        short_name: `Qwerqy`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/Q.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-typescript`,
    'gatsby-plugin-tslint',
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [{ name: 'en' }],
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'tags', store: true, attributes: { boost: 5 } },
          { name: 'description', store: true, attributes: { boost: 10 } },
          { name: 'content' },
          { name: 'url', store: true },
          { name: 'date', store: true },
        ],
        resolvers: {
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            description: node => node.frontmatter.description,
            tags: node => node.frontmatter.tags,
            content: node => node.rawMarkdownBody,
            url: node => node.fields.slug,
            date: node => node.frontmatter.date,
          },
        },
      },
      filename: 'search_index.json',
    },
  ],
};
