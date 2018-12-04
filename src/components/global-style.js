import { createGlobalStyle } from 'styled-components'
import { normalize, modularScale } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  
  body {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    color: ${(props) => props.theme.text.dark};
  }

  h1 {
    color: ${(props) => props.theme.primary['400']};
    font-size: ${modularScale(8)};
    font-weight: lighter;
    letter-spacing: -1.5pt;
  }

  h2 {
    color: ${(props) => props.theme.primary['400']};
    font-size: ${modularScale(7)};
    font-weight: lighter;
    letter-spacing: -0.5pt;
  }

  h3 {
    font-size: ${modularScale(6)};
    letter-spacing: 0;
  }

  h4 {
    font-size: ${modularScale(5)};
    letter-spacing: 0.25pt;
  }

  h5 {
    font-size: ${modularScale(4)};
    letter-spacing: 0;
  }

  h6 {
    font-size: ${modularScale(3)};
    font-weight: medium;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.secondary['A200']};

    &:hover {
      color: ${(props) => props.theme.secondary['A700']};
    }
  }
`

export default GlobalStyle
