import React, { useState } from "react";
import BackNavBar from "../components/BackNavBar.jsx";
import Event from "../components/Event.jsx";
import Loading from "../components/Loading.jsx";
import {
  ButtonGroup,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import {
  useEventById,
  useUpdateEvent,
  useDeleteEvent,
} from "../hooks/events.hooks.js";
import { useMe } from "../hooks/auth.hooks.js";
import { useCreateCanidate } from "../hooks/canidates.hooks.js";
import useAuth from "../hooks/useAuth.js";
import useForm from "../hooks/useForm.js";

export default function EventPage() {
  const { eventId } = useParams();
  const { data, isFetching } = useEventById(eventId);
  const { data: user } = useMe();

  return (
    <>
      <BackNavBar />
      {user &&
        data &&
        (data?.data?.creator?.name === user?.data?.name ? (
          <EventControls event={data.data} />
        ) : null)}
      {isFetching && <Loading />}
      {data && data?.success && <Event {...data.data} />}
    </>
  );
}

function EventControls({ event }) {
  const [updateEventDialogOpen, setUpdateEventDialogOpen] = useState(false);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const [createCanidateDialogOpen, setCreateCanidateDialogOpen] = useState(
    false
  );

  return (
    <>
      <Grid container justify="flex-end">
        <Box marginY={2}>
          <ButtonGroup variant="outlined" color="primary">
            <Button onClick={() => setUpdateEventDialogOpen(true)}>
              Update Event
            </Button>
            <Button onClick={() => setDeleteEventDialogOpen(true)}>
              Delete Event
            </Button>
            <Button onClick={() => setCreateCanidateDialogOpen(true)}>
              Add Canidate
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <UpdateEventDialog
        open={updateEventDialogOpen}
        handleClose={() => setUpdateEventDialogOpen(false)}
        name={event?.name}
        eventId={event?._id}
        description={event?.description}
      />
      <DeleteEventDialog
        open={deleteEventDialogOpen}
        handleClose={() => setDeleteEventDialogOpen(false)}
        eventId={event?._id}
      />
      <CreateCanidateDialog
        open={createCanidateDialogOpen}
        handleClose={() => setCreateCanidateDialogOpen(false)}
        eventId={event?._id}
      />
    </>
  );
}

function UpdateEventDialog({ open, handleClose, name, description, eventId }) {
  const { inputs, handleChange, clearForm } = useForm({
    name,
    description,
  });

  const token = useAuth();
  const { mutate, isLoading } = useUpdateEvent(token, eventId);

  const handleSubmit = async () => {
    await mutate(inputs);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update event</DialogTitle>
      <DialogContent>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="name"
            label="Event name"
            type="text"
            value={inputs["name"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginY={2}>
          <TextField
            name="description"
            label="Event Description"
            type="text"
            value={inputs["description"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearForm();
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DeleteEventDialog({ open, handleClose, eventId }) {
  const token = useAuth();
  const { mutate, isLoading } = useDeleteEvent(token, eventId);
  const history = useHistory();

  const handleDelete = async () => {
    await mutate();
    handleClose();
    history.push("/");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update event</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete event.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          color="primary"
        >
          No
        </Button>
        <Button color="primary" onClick={handleDelete} disabled={isLoading}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function CreateCanidateDialog({ open, handleClose, eventId }) {
  const { inputs, handleChange, clearForm } = useForm({
    name: "",
    description: "",
  });
  const token = useAuth();
  const { mutate, isLoading } = useCreateCanidate(token, eventId);

  const handleCreate = async () => {
    await mutate(inputs);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Create canidate</DialogTitle>
      <DialogContent>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="name"
            label="Canidate name"
            type="text"
            value={inputs["name"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginY={2}>
          <TextField
            name="description"
            label="Canidate description"
            type="text"
            value={inputs["description"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            clearForm();
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleCreate} disabled={isLoading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
