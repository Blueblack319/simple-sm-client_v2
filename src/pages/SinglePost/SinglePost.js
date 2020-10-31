import React, { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { gql, useQuery, useMutation } from "@apollo/client";

import "./SinglePost.css";

import PostCard from "../../components/PostCard/PostCard";
import InputCommentForm from "./InputCommentForm/InputCommentForm";
import Comments from "./Comments/Comments";

const FETCH_POST_QUERY = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      userName
      createdAt
      comments {
        id
        body
        userName
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

const SinglePost = (props) => {
  const { loading, error, data: { getPost } = "" } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: { postId: props.match.params.postId },
    }
  );

  return (
    <div className='singlePost'>
      {getPost && (
        <Grid centered>
          <Grid.Column width={3}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
              size='small'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <PostCard post={getPost} />
            <InputCommentForm postId={getPost.id} />
            <Comments comments={getPost.comments} />
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
};

export default SinglePost;
