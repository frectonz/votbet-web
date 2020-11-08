import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import useForm from "../hooks/useForm.js";
import useAuth from "../hooks/useAuth.js";
import { useCreateComment } from "../hooks/comments.hooks.js";

export default function CommentForm({ eventId }) {
  const { inputs, handleChange, clearForm } = useForm({
    text: "",
  });
  const token = useAuth();
  const { mutate, isLoading } = useCreateComment(token, eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate(inputs);
    clearForm();
  };

  return (
    <Box marginY={2}>
      <Paper variant="outlined">
        <Box padding={2}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" align="right" color="textSecondary">
              Write a comment
            </Typography>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                name="text"
                label="Your Comment"
                value={inputs["text"]}
                onChange={handleChange}
              />
            </Box>
            <Grid container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoading}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
