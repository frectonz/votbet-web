import React from "react";
import { Alert } from "@material-ui/lab";
import { Box } from "@material-ui/core";

export default function ErrorDisplay({ errors }) {
  errors = errors.split(",");

  return (
    <Box marginY={5}>
      {errors.map((error, index) => (
        <Box marginY={2} key={index}>
          <Alert severity="error">{error}</Alert>
        </Box>
      ))}
    </Box>
  );
}
