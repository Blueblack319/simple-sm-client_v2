import { useState } from "react";

export const useForm = (initialValues, callback) => {
  const [values, setValues] = useState(initialValues);
  const handleInputChanged = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleFormSubmitted = (event) => {
    event.preventDefault();
    callback();
  };
  return {
    values,
    handleInputChanged,
    handleFormSubmitted,
  };
};
