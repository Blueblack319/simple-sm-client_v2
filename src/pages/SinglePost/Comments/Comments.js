import React from "react";
import { Card } from "semantic-ui-react";

const Comments = ({ comments }) => {
  const commentsList = comments.map((comment) => (
    <Card fluid>
      <Card.Content>
        <Card.Header>{comment.userName}</Card.Header>
        <Card.Meta>{comment.createdAt}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
    </Card>
  ));
  return commentsList;
};

export default Comments;
