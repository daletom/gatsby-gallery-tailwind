const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const wpData = await graphql(`
        {
            allWpPost {
                edges {
                    node {
                        title
                        excerpt
                        slug
                        content
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
  `)

    if (wpData.errors) {
        console.error(wpData.errors)
    }

    const { allWpPost } = wpData.data
    allWpHost.edges.node.forEach( post => {
        createPage({
            path: `/${post.slug}`,
            component: require.resolve(`./src/templates/blog-post.js`),
            context: { post },
        })
    })

}

/*exports.createPages = ({ graphql, actions }) => {
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
}*/