import React, { useState } from "react";

import {
  Card,
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { VerifiedUser } from "@material-ui/icons";
import EventCard from "./EventCard.jsx";

import dayjs from "dayjs";
import useForm from "../hooks/useForm.js";
import useAuth from "../hooks/useAuth.js";
import {
  useAddBio,
  useUpdateDetails,
  useUpdatePassword,
} from "../hooks/auth.hooks.js";

export default function User({
  name,
  email,
  bio,
  events,
  verified,
  createdAt,
  showControls,
}) {
  return (
    <Card variant="outlined">
      <Box padding={2}>
        <Grid container justify="flex-start">
          <Typography variant="h4">{name}</Typography>
          {verified && <VerifiedUser color="primary" />}
        </Grid>
        <Typography variant="body2" color="textSecondary">
          {email}
        </Typography>
        <Typography variant="body1" color="primary">
          {bio}
        </Typography>
        <Typography variant="caption" color="primary">
          Created At {dayjs(createdAt).format("MMM DD, YYYY")}
        </Typography>

        <Box marginY={2}>
          <Divider />
        </Box>

        {showControls && <UserControls name={name} email={email} bio={bio} />}

        <Box marginY={2}>
          <Divider />
        </Box>

        {events?.length > 0 && <Typography variant="h5">My Events</Typography>}
        {events &&
          events.map((event, index) => {
            return <EventCard key={index} {...event} />;
          })}
      </Box>
    </Card>
  );
}

function UserControls({ bio, name, email }) {
  const [bioDialoagOpen, setBioDialoagOpen] = useState(false);
  const [updateDetailsDialoagOpen, setUpdateDetailsDialoagOpen] = useState(
    false
  );
  const [updatePasswordDialoagOpen, setUpdatePasswordDialoagOpen] = useState(
    false
  );

  return (
    <>
      <ButtonGroup color="primary" variant="outlined" size="small">
        <Button onClick={() => setBioDialoagOpen(true)}>Add Bio</Button>
        <Button onClick={() => setUpdateDetailsDialoagOpen(true)}>
          Update Details
        </Button>
        <Button onClick={() => setUpdatePasswordDialoagOpen(true)}>
          Update Password
        </Button>
      </ButtonGroup>
      <AddBioDialog
        bio={bio}
        open={bioDialoagOpen}
        handleClose={() => setBioDialoagOpen(false)}
      />
      <UpdateDetailsDialog
        name={name}
        email={email}
        open={updateDetailsDialoagOpen}
        handleClose={() => setUpdateDetailsDialoagOpen(false)}
      />
      <UpadatePasswordDialog
        open={updatePasswordDialoagOpen}
        handleClose={() => setUpdatePasswordDialoagOpen(false)}
      />
    </>
  );
}

function AddBioDialog({ bio, open, handleClose }) {
  const { inputs, handleChange, clearForm } = useForm({
    bio,
  });

  const token = useAuth();
  const { mutate, isLoading } = useAddBio(token);

  const handleSubmit = async () => {
    await mutate(inputs.bio);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Bio</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          name="bio"
          label="Your Bio"
          type="text"
          value={inputs["bio"]}
          onChange={handleChange}
          fullWidth
        />
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

function UpdateDetailsDialog({ open, handleClose, name, email }) {
  const { inputs, handleChange, clearForm } = useForm({
    name,
    email,
  });

  const token = useAuth();
  const { mutate, isLoading } = useUpdateDetails(token);

  const handleSubmit = async () => {
    await mutate(inputs);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update details</DialogTitle>
      <DialogContent>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="name"
            label="Your name"
            type="text"
            value={inputs["name"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginY={2}>
          <TextField
            name="email"
            label="Your email"
            type="text"
            value={inputs["email"]}
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

function UpadatePasswordDialog({ open, handleClose }) {
  const { inputs, handleChange, clearForm } = useForm({
    oldPassword: "",
    newPassword: "",
  });
  const token = useAuth();
  const { mutate, isLoading } = useUpdatePassword(token);

  const handleSubmit = async () => {
    await mutate(inputs);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update Password</DialogTitle>
      <DialogContent>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="oldPassword"
            label="Your old password"
            type="password"
            value={inputs["oldPassword"]}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="newPassword"
            label="Your new password"
            type="password"
            value={inputs["newPassword"]}
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
