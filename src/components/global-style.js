import { createGlobalStyle } from 'styled-components'
import { normalize, modularScale } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()};
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    color: ${(props) => props.theme.text.dark};
    margin: 0;
    padding: 0;
    width: 100%;
  }

  h1 {
    color: ${(props) => props.theme.primary['700']};
    font-size: ${modularScale(6)};
    font-weight: lighter;
    letter-spacing: -1.5pt;
  }

  h2 {
    color: ${(props) => props.theme.primary['700']};
    font-size: ${modularScale(5)};
    font-weight: lighter;
    letter-spacing: -0.5pt;
  }

  h3 {
    color: ${(props) => props.theme.primary['400']};
    font-weight: normal;
    font-size: ${modularScale(4)};
    letter-spacing: 0;
  }

  h4 {
    font-size: ${modularScale(3)};
    font-weight: normal;
    letter-spacing: 0.25pt;
  }

  h5 {
    font-size: ${modularScale(2)};
    font-weight: normal;
    letter-spacing: 0;
  }

  h6 {
    font-size: ${modularScale(1)};
    font-weight: medium;
  }

  p {
    margin-top: ${modularScale(2)};
    line-height: ${modularScale(1.5)};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.secondary['A200']};

    &:hover {
      color: ${(props) => props.theme.secondary['A700']};
    }
  }

  blockquote {
    background: ${(props) => props.theme.primary['50']};
    font-style: italic;
    padding: ${modularScale(-3)} ${modularScale(0)};
    margin: 0;
  }
`

export default GlobalStyle
