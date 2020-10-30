import { useState } from "react";

export const useForm = (initialValues, signupUser) => {
  const [values, setValues] = useState(initialValues);
  const handleInputChanged = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleFormSubmitted = (event) => {
    event.preventDefault();
    signupUser();
  };
  return {
    values,
    handleInputChanged,
    handleFormSubmitted,
  };
};
