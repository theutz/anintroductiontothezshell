import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import TableOfContents from '../components/table-of-contents'

function Introduction() {
  return (
    <StaticQuery
      query={graphql`
        {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___order] }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  title
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const pages = data.allMarkdownRemark.edges.map(({ node }) => ({
          name: node.frontmatter.title,
          link: node.frontmatter.path,
        }))

        return (
          <Layout>
            <h2>Table of Contents</h2>
            <TableOfContents entries={pages} />
          </Layout>
        )
      }}
    />
  )
}

export default Introduction
