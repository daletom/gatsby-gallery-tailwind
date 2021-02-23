/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const { ImgixSourceType } = require("@imgix/gatsby");

module.exports = {
  siteMetadata: {
    title: `Gatsby WordPress Tutorial`,
    description: `An example to learn how to source data from WordPress.`,
    author: `tomdale`,
  },
  plugins: [
    {
      resolve: `@imgix/gatsby`,
      options: {
        domain: 'tom-proxy.imgix.net',
        secureURLToken: 'UeCnTaStKyB9Vrca',
        sourceType: ImgixSourceType.WebProxy,
        defaultImgixParams: { auto: 'format,compress '},
        fields: [
          {
            nodeType: "WpMediaItem",
            fieldName: "imgixImage",
            getURL: node => undefined
          },
        ]
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://farfarawaynews.000webhostapp.com/graphql`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
],
}
