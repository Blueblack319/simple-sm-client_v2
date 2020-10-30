import React from "react";
import moment from "moment";
import { Card, Button, Icon, Label, Image } from "semantic-ui-react";

const PostCard = ({ post }) => {
  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
          />
          <Card.Header>{post.userName}</Card.Header>
          <Card.Meta>{moment(post.createdAt).fromNow(true)}</Card.Meta>
          <Card.Description>{post.body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button as='div' labelPosition='right'>
            <Button color='red'>
              <Icon name='heart' />
            </Button>
            <Label as='a' basic color='red' pointing='left'>
              {post.likesCount}
            </Label>
          </Button>
          <Button as='div' labelPosition='right'>
            <Button basic color='blue'>
              <Icon name='comments' />
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
              {post.commentsCount}
            </Label>
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostCard;
