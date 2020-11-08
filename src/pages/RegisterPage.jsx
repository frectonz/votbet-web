import React from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import FormField from "../components/FormField/index.jsx";
import ErrorDisplay from "../components/ErrorDisplay.jsx";

import useForm from "../hooks/useForm.js";
import { useRegister } from "../hooks/auth.hooks";
import { setToken } from "../utils/token.js";
import { useHistory } from "react-router-dom";

export default function RegisterPage() {
  const { inputs, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { mutate, isLoading, data } = useRegister();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    let returnedData = await mutate(inputs);

    if (returnedData?.success) {
      setToken(returnedData?.token);
      history.push("/");
    }
  };

  return (
    <Box marginTop={10}>
      <Typography variant="h3">Register</Typography>
      <form onSubmit={onSubmit}>
        <FormField name="name" value={inputs["name"]} onChange={handleChange} />
        <FormField
          name="email"
          type="email"
          value={inputs["email"]}
          onChange={handleChange}
        />
        <FormField
          name="password"
          type="password"
          value={inputs["password"]}
          onChange={handleChange}
        />

        <Box marginTop={5}>
          <Grid container justify="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </form>
      {data?.error && <ErrorDisplay errors={data?.error} />}
    </Box>
  );
}
