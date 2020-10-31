import { useMutation, gql } from "@apollo/client";
import React from "react";
import { Button, Card, Form, Message } from "semantic-ui-react";

import "./PostForm.css";
import { useForm } from "../../utils/hooks";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";
import InfoPopup from "../InfoPopup/InfoPopup";

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
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update: (proxy, result) => {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      values.body = "";
    },
    variables: values,
    onError: () => {},
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
              value={values.body}
              name='body'
            />
            <InfoPopup content='Submit Post'>
              <Button
                type='submit'
                color='teal'
                disabled={values.body.trim() === ""}>
                Submit
              </Button>
            </InfoPopup>
          </Form>
        </Card.Content>
      </Card>
      {error && values.body === "" && (
        <Message error header='Error!' list={[error.message]} />
      )}
    </div>
  );
};

export default PostForm;
