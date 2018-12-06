import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { modularScale, readableColor } from 'polished'
import styled from 'styled-components'
import media from 'styled-media-query'
import PropTypes from 'prop-types'

const Header = ({ siteTitle }) => (
  <Outer>
    <Inner>
      <Title>
        <Link to="/">{siteTitle}</Link>
      </Title>
    </Inner>
  </Outer>
)

const Outer = styled.div`
  background: ${(props) => props.theme.primary['400']};
  display: flex;
  width: 100%;
  justify-content: center;
`

const Inner = styled.div`
  width: 960px;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: ${modularScale(2)};
  margin: 0;

  ${media.greaterThan('medium')`
    font-size: ${modularScale(3)}
  `}
`

const Link = styled(GatsbyLink)`
  &,
  &:hover {
    color: ${(props) => readableColor(props.theme.primary['400'])};
  }
`

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
