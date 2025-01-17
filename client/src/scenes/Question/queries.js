import gql from 'graphql-tag'

export const zNodeFragment = `
  id
  question {
    id
    title
    slug
    views
    user {
      id
      name
      picture
    }
    createdAt
  }
  answer {
    id
    content
    sources {
      id
      label
      url
    }
    user {
      id
      name
      picture
    }
    createdAt
  }
  flags {
    id
    type
    user {
      id
      name
    }
    createdAt
  }
  tags {
    id
    label
  }
`

export const getNode = gql`
  query($id: ID!) {
    zNode(where: { id: $id }) {
      ${zNodeFragment}
    }
  }
`
