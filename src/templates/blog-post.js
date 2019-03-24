
import React from 'react'
import { graphql } from 'gatsby';
import Img from 'gatsby-image'

import heroStyles from '../components/hero.module.css'
import Layout from '../components/Layout';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulBlogPost
    //const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout title={post.title}>
        {post.heroImage && <div className={heroStyles.hero}>
          <Img className={heroStyles.heroImage} alt={post.title} sizes={post.heroImage.sizes} />
        </div>}

        <article className="post">
            <h1>{post.title}</h1>
            {
            <span className="date">
                {post.publishDate}
            </span>
            }
            {post.tags && post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        title,
        sizes(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`