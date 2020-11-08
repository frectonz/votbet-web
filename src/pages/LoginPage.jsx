import React from "react";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import FormField from "../components/FormField/index.jsx";
import ErrorDisplay from "../components/ErrorDisplay.jsx";

import useForm from "../hooks/useForm.js";
import { useLogin } from "../hooks/auth.hooks";
import { useHistory } from "react-router-dom";
import { setToken } from "../utils/token";

export default function LoginPage() {
  const { inputs, handleChange } = useForm({
    email: "",
    password: "",
  });
  const { mutate, isLoading, data } = useLogin();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutate(inputs);

    if (data?.success) {
      setToken(data?.token);
      history.push("/");
    }
  };

  return (
    <Box marginTop={10}>
      <Typography variant="h3">Log in</Typography>
      <form onSubmit={onSubmit}>
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
