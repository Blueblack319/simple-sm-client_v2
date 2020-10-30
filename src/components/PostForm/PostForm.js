import { useMutation, gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Card, Form } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import { useForm } from "../../utils/hooks";

import "./PostForm.css";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      userName
      createdAt
      commentsCount
      comments {
        id
        userName
        body
        createdAt
      }
      likesCount
      likes {
        id
        userName
        createdAt
      }
    }
  }
`;

const PostForm = () => {
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    { body: "" },
    addPost
  );
  const [createPost, data] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      console.log(proxy, result);
      console.log(data);
    },
    variables: values,
  });

  function addPost() {
    createPost();
  }

  return (
    <div className='postForm'>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={handleFormSubmitted}>
            <h2>Create Post:</h2>
            <Form.Input
              type='text'
              placeholder='Type..'
              fluid
              onChange={handleInputChanged}
            />
            <Button type='submit' color='teal'>
              Submit
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
};

export default PostForm;
