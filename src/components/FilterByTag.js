import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import _ from 'lodash'

class FilterByTag extends React.Component {
    state = {
    }

    handleInputChange = event => {
        console.log("handle input change")
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }

    handleSubmit = event => {
        console.log("handle submit")
        event.preventDefault()
    }

    handleSth = () => {

    }

    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark
        const { callback } = this.props
        console.log(typeof callback)
        this.handleSth = callback;
        return (
            <form onSubmit={this.handleSubmit}>
                {
                    _.uniq(_.flatten(posts.map(({ node: post }) => {
                        return post.frontmatter.tags
                    }))).map((tag) => {
                        return <div><input type="checkbox" name={tag} onChange={this.handleSth}></input>
                            <label for={tag}>{tag}</label></div>
                    })
                }
            </form>
        )
    }
}

FilterByTag.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default (pies) => (
    <StaticQuery
        query={graphql`
        query FilterByTagQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
        render={(data) => <FilterByTag data={data} callback = {pies.parentCallback}/>}
    />
)
