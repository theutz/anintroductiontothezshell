import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <h3>Documentation</h3>
    <ul>
      <li>
        <Link to="/introduction">Introduction</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
