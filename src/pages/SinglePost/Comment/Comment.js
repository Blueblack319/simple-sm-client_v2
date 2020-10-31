import React, { useContext } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";

import "./Comment.css";
import { AuthContext } from "../../../context/auth";
import InfoPopup from "../../../components/InfoPopup/InfoPopup";

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      userName
      createdAt
      likes {
        id
        userName
        createdAt
      }
      likesCount
      comments {
        id
        userName
        body
        createdAt
      }
      commentsCount
    }
  }
`;

const Comment = ({ comment, postId }) => {
  const { userData } = useContext(AuthContext);
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { postId, commentId: comment.id },
    onError: (error) => console.log(error),
  });

  return (
    <Card fluid className='comment'>
      <Card.Content>
        <Card.Header>{comment.userName}</Card.Header>
        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
        {userData && userData.userName === comment.userName && (
          <InfoPopup content='Delete Comment'>
            <Button color='red' floated='right' onClick={deleteComment}>
              <Icon name='trash' />
            </Button>
          </InfoPopup>
        )}
      </Card.Content>
    </Card>
  );
};

export default Comment;
