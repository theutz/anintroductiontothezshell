import React from 'react'
import { graphql, Link as GatsbyLink } from 'gatsby'
import { pipe, get, eq, find, first, defaultTo } from 'lodash/fp'
import { modularScale } from 'polished'
import media from 'styled-media-query'
import styled from 'styled-components'
import Layout from '../components/layout'

function MarkdownLayout({ data }) {
  const { markdownRemark, allMarkdownRemark } = data
  const {
    html,
    fields: { order },
  } = markdownRemark

  function getNodeByOrder(order) {
    return getNodeByOrderFromEdges(allMarkdownRemark.edges)(order)
  }

  function getSlug(node) {
    return get('fields.slug')(node)
  }

  const next = getNodeByOrder(order + 1)
  const prev = getNodeByOrder(order - 1)

  return (
    <Layout>
      <NavBar>
        {!!prev && (
          <Prev to={getSlug(prev)}>{getFirstHeadingFromNode(prev)}</Prev>
        )}
        <Current to={getSlug(markdownRemark)}>
          {getFirstHeadingFromNode(markdownRemark)}
        </Current>
        {!!next && (
          <Next to={getSlug(next)}>{getFirstHeadingFromNode(next)}</Next>
        )}
      </NavBar>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  align-items: center;
  padding: ${modularScale(0)};

  ${media.greaterThan('small')`
    flex-flow: row nowrap;
    justify-content: space-between;
  `}
`
const Link = styled(GatsbyLink)`
  color: ${(props) => props.theme.secondary[200]};

  &:before,
  &:after {
    opacity: 0.5;
    font-size: ${modularScale(1)};
    vertical-align: -${modularScale(-9)};
  }

  &:hover:before,
  &:hover:after {
    opacity: 1;
  }
`

const Next = styled(Link)`
  &:after {
    content: ' 👉';
  }
`

const Prev = styled(Link)`
  &:before {
    content: '👈 ';
  }
`

const Current = styled(Link)`
  &:before {
    content: '🎯 ';
  }
`

export const pageQuery = graphql`
  fragment MarkdownPage on MarkdownRemark {
    html
    headings {
      value
    }
    fields {
      slug
      order
    }
  }

  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      ...MarkdownPage
    }
    allMarkdownRemark {
      edges {
        node {
          ...MarkdownPage
        }
      }
    }
  }
`

function getNodeByOrderFromEdges(edges) {
  return (order) =>
    pipe(
      find(
        pipe(
          get('node.fields.order'),
          eq(order)
        )
      ),
      get('node')
    )(edges)
}

function getFirstHeadingFromNode(...args) {
  return pipe(
    get('headings'),
    first,
    get('value')
  )(...args)
}

export default MarkdownLayout
