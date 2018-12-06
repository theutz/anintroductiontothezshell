import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { modularScale } from 'polished'

function Entry({ link, name, entries, ...props }) {
  return (
    <Item {...props}>
      <Link to={link}>{name}</Link>
      {!!entries && <Entries entries={entries} />}
    </Item>
  )
}

function Entries({ entries, ...props }) {
  return (
    <List {...props}>
      {entries.map(({ name, link, entries }) => (
        <Entry key={link} name={name} link={link} entries={entries} />
      ))}
    </List>
  )
}

function TableOfContents({ entries, ...props }) {
  return <Entries {...props} entries={entries} />
}

const List = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  counter-reset: li;
`

const Item = styled.li`
  margin-bottom: ${modularScale(1)};
  font-size: ${modularScale(2)};
  counter-increment: li;

  &:before {
    content: counter(li);
    margin-right: ${modularScale(0)};
    color: ${(props) => props.theme.primary[200]};
  }

  &:after {
    content: ' 🔗';
    display: none;
    font-size: ${modularScale(-2)};
    vertical-align: ${modularScale(-5)};
  }

  &:hover:after {
    display: inline;
  }
`

const treeEntry = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  // eslint-disable-next-line
  entries: PropTypes.arrayOf(treeEntry),
}

Entry.propTypes = {
  ...treeEntry,
}

Entries.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape(treeEntry)),
}

TableOfContents.propTypes = {
  tree: PropTypes.arrayOf(treeEntry),
}

export default TableOfContents
