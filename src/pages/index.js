import React from "react"
import { graphql } from "gatsby"
//import Image from "gatsby-image"

const IndexPage = ({data}) => (
  <div class="p-4">  
    <h1>Hi There</h1>
    <p>This is Gatsby stuff happening</p>
    <div class="p-4">
      <img src={data.post.featuredImage.node.sourceUrl}
      srcset={data.post.featuredImage.node.srcSet}
      sizes={data.post.featuredImage.node.sizes} />
    </div>
  </div>
)

export default IndexPage

export const query = graphql`
query {
  post: wpPost {
    id
    title
    featuredImage {
      node {
        altText
        sourceUrl
        srcSet
        sizes
      }
    }
  }
}
`
