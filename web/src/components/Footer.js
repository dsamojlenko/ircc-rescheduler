import React from 'react'
import PropTypes from 'prop-types'
import { WordMark } from '@cdssnc/gcui'
import styled, { css } from 'react-emotion'
import { theme, mediaQuery } from '../styles'

const Circle = styled.span`
  font-size: 0.5em;
  position: relative;
  bottom: 2px;

  ${mediaQuery.md(css`
    display: none;
  `)};
`

const footer = css`
  background-color: ${theme.colour.white};
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  position: relative;
  font-size: ${theme.font.md};

  .svg-container {
    width: 150px;
    height: 40px;

    ${mediaQuery.md(css`
      width: 85px;
      height: 25px;
    `)};

    ${mediaQuery.sm(css`
      width: 65px;
      height: 18px;
    `)};
  }

  ${mediaQuery.md(css`
    align-items: center;
    flex-direction: row;
    padding: ${theme.spacing.xl} ${theme.spacing.xxxl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xl};
  `)};
`

const bottomLinks = css`
  margin-top: ${theme.spacing.md};
  font-size: ${theme.font.md};
  display: inline-block;

  > * {
    margin-right: ${theme.spacing.md};

    ${mediaQuery.md(css`
      margin-right: 0;
      margin-left: ${theme.spacing.md};
    `)};

    ${mediaQuery.sm(css`
      margin-bottom: ${theme.spacing.xs};
    `)};
  }

  a {
    color: ${theme.colour.black};
  }

  ${mediaQuery.md(css`
    display: flex;
    margin-top: ${theme.spacing.sm};
    font-size: ${theme.font.sm};
    flex-direction: row;
    align-items: center;
  `)};

  ${mediaQuery.sm(css`
    margin-top: ${theme.spacing.md};
  `)};
`
const terms = css`
  span::after {
    content: "Terms and Conditions";
    ${mediaQuery.xs(css`
      content: "Terms";
    `)};
  }
`

const TopBar = styled.hr(
  {
    height: '0.4em',
    border: 'none',
    margin: 0,
  },
  props => ({ background: props.background }),
)

const Footer = ({ topBarBackground }) => (
  <div>
    {topBarBackground ? <TopBar background={topBarBackground} /> : ''}
    <footer className={footer}>
      <div className="svg-container">
        <WordMark
          width="150px"
          height="40px"
          flag={theme.colour.redFIP}
          text={theme.colour.black}
        />
      </div>

      <div className={bottomLinks}>
        <a href="mailto:cds-snc@tbs-sct.gc.ca">Contact</a>
        <Circle>&#9679;</Circle>
        <a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a>
        <Circle>&#9679;</Circle>
        <a className={terms} href="https://digital.canada.ca/legal/terms/">
          <span className={terms}></span>
        </a>
      </div>
    </footer>
  </div>
)
Footer.propTypes = {
  topBarBackground: PropTypes.string,
}

export default Footer
