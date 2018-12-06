import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { modularScale } from 'polished'
import GlobalStyle from './global-style'
import Header from './header'
import theme from '../theme'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'An introduction to the Z Shell' },
            {
              name: 'keywords',
              content: 'zsh, z shell, bash, scripting, unix',
            },
          ]}
        >
          <html lang="en" />
          <link
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans+Condensed:300,400,400i,500,700"
            rel="stylesheet"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Header siteTitle={data.site.siteMetadata.title} />
            <Container>{children}</Container>
          </>
        </ThemeProvider>
      </>
    )}
  />
)

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;

  & pre {
    margin: 1rem 0.25rem;
  }

  & code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: ${modularScale(-1)};
    line-height: 0;
  }

  & *:not(pre) > code {
    padding: 0.2rem 0.4rem;
    vertical-align: 0.1rem;
    margin: 0 0.2rem;
    white-space: nowrap;
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
