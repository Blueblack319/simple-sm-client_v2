import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      userName
      createdAt
      comments {
        id
        userName
        body
        createdAt
      }
      commentsCount
      likes {
        id
        userName
        createdAt
      }
      likesCount
    }
  }
`;
