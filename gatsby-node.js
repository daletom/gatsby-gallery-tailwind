const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allWpPost(sort: {order: DESC, fields: date}) {
        edges {
          node {
            title
            excerpt
            content
            slug
            featuredImage {
                node {
                  localFile {
                    childImageSharp {
                      fixed {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
            }
          }
        }
      }
    }

  `).then(result => {
    result.data.allWpPost.edges.forEach(({ node }) => {
      createPage({
        // Decide URL structure
        path: node.slug,
        // path to template
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
  })
}