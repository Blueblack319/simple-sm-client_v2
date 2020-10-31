import React from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./InputCommentForm.css";
import { useForm } from "../../../utils/hooks";

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

const InputComment = ({ postId }) => {
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    {
      comment: "",
    },
    submitComment
  );

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: { postId, body: values.comment },
  });

  function submitComment() {
    createComment();
  }

  return (
    <Form onSubmit={handleFormSubmitted} className='inputCommentForm'>
      <h2>What do you think?</h2>
      <Form.Input
        type='text'
        placeholder='Type..'
        name='comment'
        onChange={handleInputChanged}
        value={values.comment}
      />
      <Button type='submit' color='teal' floated='right'>
        Submit
      </Button>
    </Form>
  );
};

export default InputComment;
