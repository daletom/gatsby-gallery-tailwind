import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Image from "gatsby-image"

export default ({ data }) => {
  return (
  <div class="p-4">  
    <h1>Far Far Away News</h1>
    <h3>Posts</h3>
    {data.allWpPost.edges.map(({ node }) => (
      <div class="p-4 w-1/3">
      <Link to={node.slug}>
        <p class="text-2xl p-2">{parse(node.title)}</p>
        </Link>
        <Image 
        fixed={node.featuredImage.node.localFile.childImageSharp.fixed}
        class="w-2/4"
        />
        <p class="p-2">{parse(node.excerpt)}</p>
      </div>
    ))}
    </div>
    )
}

export const query = graphql`
query {
  allWpPost(sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        excerpt
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
`
