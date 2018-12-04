import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'

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
        const pages = data.allMarkdownRemark.edges.map(
          ({ node }) => node.frontmatter
        )
        return (
          <Layout>
            <ul>
              {pages.map(({ title, path }) => (
                <li key={path}>
                  <Link to={path}>{title}</Link>
                </li>
              ))}
            </ul>
          </Layout>
        )
      }}
    />
  )
}

export default Introduction
