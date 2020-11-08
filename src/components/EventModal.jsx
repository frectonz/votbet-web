import React, { useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  IconButton,
} from "@material-ui/core";
import ErrorDisplay from "./ErrorDisplay";
import { Close } from "@material-ui/icons";

import useForm from "../hooks/useForm.js";
import { useCreateEvent } from "../hooks/events.hooks.js";
import useAuth from "../hooks/useAuth.js";
import { Snackbar } from "@material-ui/core";

export default function EventModal({ open, handleClose }) {
  const { inputs, handleChange, clearForm } = useForm({
    name: "",
    description: "",
    startDate: "2024-01-01",
    endDate: "2030-01-01",
  });
  const token = useAuth();
  const { mutate, data } = useCreateEvent();
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await mutate({
      token,
      ...inputs,
    });

    if (data?.success) {
      clearForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">New Event</DialogTitle>
        <DialogContent>
          <Box marginY={2}>
            <TextField
              autoFocus
              fullWidth
              name="name"
              label="Event Name"
              value={inputs["name"]}
              onChange={handleChange}
            />
          </Box>
          <Box marginY={2}>
            <TextField
              fullWidth
              name="description"
              label="Event Description"
              value={inputs["description"]}
              onChange={handleChange}
            />
          </Box>
          <Box marginY={2}>
            <TextField
              fullWidth
              type="date"
              name="startDate"
              InputLabelProps={{
                shrink: true,
              }}
              label="Event start date"
              value={inputs["startDate"]}
              onChange={handleChange}
            />
          </Box>
          <Box marginY={2}>
            <TextField
              fullWidth
              type="date"
              name="endDate"
              InputLabelProps={{
                shrink: true,
              }}
              label="Event end date"
              value={inputs["endDate"]}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        {data?.error && (
          <DialogContent>
            <ErrorDisplay errors={data?.error} />
          </DialogContent>
        )}
        {data?.success && (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="Event created"
            action={
              <>
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={() => setSnackbarOpen(false)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </>
            }
          />
        )}
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
