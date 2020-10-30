import React, { useContext, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import "./Signup.css";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";

const SIGNUP_USER_MUTATION = gql`
  mutation Signup(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      signupInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      userName
      email
      createdAt
      token
    }
  }
`;

const Signup = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    initialValues,
    signupUser
  );
  const [signup, { loading }] = useMutation(SIGNUP_USER_MUTATION, {
    variables: values,
    update(proxy, { data: { signup } }) {
      context.login(signup);
      props.history.push("/");
    },
    onError(error) {
      setErrors(
        error.graphQLErrors[0].extensions.errors
          ? error.graphQLErrors[0].extensions.errors
          : error.graphQLErrors[0].extensions.error
      );
    },
  });
  function signupUser() {
    signup();
  }

  return (
    <div className='signup'>
      <Form size='large' onSubmit={handleFormSubmitted} loading={loading}>
        <Form.Field>
          <Form.Input
            label='User Name'
            placeholder='User Name'
            name='userName'
            value={values.userName}
            onChange={handleInputChanged}
            error={errors.userName && values.userName === ""}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            value={values.email}
            onChange={handleInputChanged}
            error={errors.email && values.email === ""}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            value={values.password}
            onChange={handleInputChanged}
            error={errors.password && values.password === ""}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            label='Confirm Password'
            placeholder='Confirm Password'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleInputChanged}
            error={errors.confirmPassword && values.confirmPassword === ""}
          />
        </Form.Field>
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message error header='Error!' list={[...Object.values(errors)]} />
      )}
    </div>
  );
};

export default Signup;
