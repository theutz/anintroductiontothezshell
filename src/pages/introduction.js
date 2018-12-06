import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import {
  map,
  capitalize,
  split,
  last,
  pipe,
  compact,
  words,
  join,
} from 'lodash/fp'
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
            split('/'),
            compact,
            last,
            words,
            map(capitalize),
            join(' ')
          )(node.fields.slug),
          link: node.fields.slug,
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
