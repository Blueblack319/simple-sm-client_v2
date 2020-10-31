import React, { useRef } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./InputCommentForm.css";
import { useForm } from "../../../utils/hooks";
import InfoPopup from "../../../components/InfoPopup/InfoPopup";

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
  const inputRef = useRef(null);
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    {
      comment: "",
    },
    submitComment
  );

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: { postId, body: values.comment },
    update: () => {
      values.comment = "";
      inputRef.current.blur();
    },
  });

  function submitComment() {
    createComment();
  }

  return (
    <Form onSubmit={handleFormSubmitted} className='inputCommentForm'>
      <h2>What do you think?</h2>
      <div className='ui fluid input'>
        <input
          type='text'
          placeholder='Type..'
          name='comment'
          value={values.comment}
          onChange={handleInputChanged}
          className='inputComment'
          ref={inputRef}
        />
        <InfoPopup content='Submit comment'>
          <Button
            type='submit'
            color='teal'
            floated='right'
            disabled={values.comment.trim() === ""}>
            Submit
          </Button>
        </InfoPopup>
      </div>
    </Form>
  );
};

export default InputComment;
