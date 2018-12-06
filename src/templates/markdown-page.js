import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

function MarkdownLayout({ data }) {
  const { markdownRemark } = data
  const { html } = markdownRemark

  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
    }
  }
`

export default MarkdownLayout
