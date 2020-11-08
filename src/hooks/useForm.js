import { useState } from "react";

const useForm = (initialState = {}) => {
  const [inputs, setInputs] = useState(initialState);

  function handleChange(e) {
    const { type, name, value } = e.target;
    let val = value;

    if (type === "number") {
      val = parseInt(value, 10);
    }

    setInputs({ ...inputs, [name]: val });
  }

  function resetForm() {
    setInputs(initialState);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
