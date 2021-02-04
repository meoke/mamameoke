import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import _ from 'lodash'

const getTags = posts => {
    const allTags = _.uniq(_.flatten(posts.map(({ node: post }) => {
        return post.frontmatter.tags
    })));
    return allTags.map(tag => {return <div>
        <input type="checkbox" name={tag}></input>
        <label for={tag}>{tag}</label>
    </div>})
}

class PostsCatalogue extends React.Component {
    render() {
        const { data } = this.props
        const { edges: posts } = data.allMarkdownRemark

        return (
            <div className="">
                <div>
                    {getTags(posts)}
                </div>
                { posts &&
                    posts.map(({ node: post }) => (
                        <div className="" key={post.id}>
                            <article
                                className={`blog-list-item tile is-child box notification ${post.frontmatter.featuredpost ? 'is-featured' : ''
                                    }`}
                            >
                                <header>
                                    {post.frontmatter.featuredimage ? (
                                        <div className="featured-thumbnail">
                                            <PreviewCompatibleImage
                                                imageInfo={{
                                                    image: post.frontmatter.featuredimage,
                                                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                    <p className="post-meta">
                                        <Link
                                            className="title has-text-primary is-size-4"
                                            to={post.fields.slug}
                                        >
                                            {post.frontmatter.title}
                                        </Link>
                                        <span> &bull; </span>
                                        <span className="subtitle is-size-5 is-block">
                                            {post.frontmatter.date}
                                        </span>
                                    </p>
                                </header>
                                <p>
                                    {post.excerpt}
                                    <br />
                                    <br />
                                    <Link className="button" to={post.fields.slug}>
                                        Keep Reading →
                    </Link>
                                </p>
                            </article>
                        </div>
                    ))}
            </div>
        )
    }
}

PostsCatalogue.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default () => (
    <StaticQuery
        query={graphql`
        query PostsCatalogueQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  tags
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 120, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
        render={(data, count) => <PostsCatalogue data={data} count={count} />}
    />
)
