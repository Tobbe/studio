import type {
  FindBlogPostQuery,
  FindBlogPostQueryVariables,
} from 'types/graphql'

import { Metadata } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import BlogPost from 'src/components/BlogPost'
import { getFirstNSentences } from 'src/lib/formatters'

export const QUERY: TypedDocumentNode<
  FindBlogPostQuery,
  FindBlogPostQueryVariables
> = gql`
  query FindBlogPostQuery($id: Int!) {
    blogPost: post(id: $id) {
      id
      title
      body
      imageUrl
      author {
        email
        fullName
      }
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBlogPostQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  blogPost,
}: CellSuccessProps<FindBlogPostQuery, FindBlogPostQueryVariables>) => (
  <>
    <Metadata
      title={blogPost.title}
      og={{
        title: `${blogPost.title} | RedwoodJS Blog`,
        description: getFirstNSentences(blogPost.body, 1),
        site_name: 'redwoodjs.com',
        image: blogPost.imageUrl,
        url: `https://redwoodjs.com/blog-posts/${blogPost.id}`,
      }}
      article={{
        author: blogPost.author.fullName,
        published_date: blogPost.createdAt,
        published_time: blogPost.createdAt,
      }}
      profile={{
        username: blogPost.author.fullName,
      }}
      twitter={{
        card: blogPost.id === 3 ? null : 'summary_large_image',
        site: 'redwoodjs.com',
        url: `https://redwoodjs.com/blog-posts/${blogPost.id}`,
        creator: `@${blogPost.author.fullName}`,
        title: blogPost.id === 2 ? null : `${blogPost.title} | RedwoodJS Blog`,
        description: getFirstNSentences(blogPost.body, 1),
        image: blogPost.imageUrl,
        'image:alt': 'this is a description of image',
      }}
    />
    <BlogPost blogPost={blogPost} />
  </>
)
