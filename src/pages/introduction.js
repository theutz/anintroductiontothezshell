import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { first, get, pipe } from 'lodash/fp'
import Layout from '../components/layout'
import TableOfContents from '../components/table-of-contents'

function Introduction() {
  return (
    <StaticQuery
      query={graphql`
        {
          allMarkdownRemark(sort: { order: ASC, fields: [fields___order] }) {
            edges {
              node {
                headings {
                  value
                }
                fields {
                  slug
                  order
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const pages = data.allMarkdownRemark.edges.map(({ node }) => ({
          name: pipe(
            get('headings'),
            first,
            get('value')
          )(node),
          link: get('fields.slug', node),
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
