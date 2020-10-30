import React, { useContext, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

import "./Login.css";
import { useForm } from "../../utils/hooks";
import { AuthContext } from "../../context/auth";

const LOGIN_USER_QUERY = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      userName
      email
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const context = useContext(AuthContext);
  const initialState = { userName: "", password: "" };
  const [errors, setErrors] = useState({});
  const { values, handleInputChanged, handleFormSubmitted } = useForm(
    initialState,
    loginUser
  );
  const [login, { loading }] = useMutation(LOGIN_USER_QUERY, {
    variables: values,
    update(proxy, { data: { login } }) {
      context.login(login);
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
  function loginUser() {
    login();
  }

  return (
    <div className='login'>
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
            label='Password'
            placeholder='Password'
            name='password'
            value={values.password}
            onChange={handleInputChanged}
            error={errors.password && values.password === ""}
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

export default Login;
