import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
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
            href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400,400i,500,700"
            rel="stylesheet"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Header siteTitle={data.site.siteMetadata.title} />
            <div>{children}</div>
          </>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
