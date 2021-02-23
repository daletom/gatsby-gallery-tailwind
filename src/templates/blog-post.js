import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"
import Image from "gatsby-image"

export default ({ data }) => {
  const post = data.allWpPost.edges[0].node
  const featuredImage = {
    fixed: post.node?.featuredImage?.node?.localFile?.childImageSharp?.fixed,
  }
  console.log(post)
  return (
      <div class="p-4">  
      <div class="p-4 w-1/3">
        <p class="text-2xl p-2">{parse(post.title)}</p>
        <p>{parse(post.content)}</p>
        <Image 
        fixed={featuredImage.fixed}
        class="w-2/4"
        />
      </div>
    </div>
  )
}

export const query = graphql`
query {
    allWpPost(sort: {order: DESC, fields: date}) {
      edges {
        node {
          title
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
  `
