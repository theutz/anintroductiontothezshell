const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode, basePath: `markdown` })

    const filename = path
      .split('/')
      .filter((x) => x !== '')
      .pop()
    const order = parseInt(
      filename
        .split('-')
        .filter((x) => x !== '')
        .shift()
    )
    const slugName = filename
      .split('-')
      .filter((x) => x !== '')
      .slice(1)
      .join('-')
    const slug = path
      .split('/')
      .filter((x) => x !== '')
      .slice(0, -1)
      .concat(slugName)
      .join('/')

    createNodeField({ node, name: `order`, value: order })
    createNodeField({ node, name: `slug`, value: `/${slug}` })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const markdownTemplate = path.resolve(`src/templates/markdown-page.js`)

  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                order
              }
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        reject(result.errors)
      }

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { fields } = node
        const { slug, order } = fields

        createPage({
          path: slug,
          component: markdownTemplate,
          context: { order, slug },
        })
      })
    })
    resolve()
  })
}
