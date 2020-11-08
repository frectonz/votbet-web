import React, { useState } from "react";
import BackNavBar from "../components/BackNavBar.jsx";
import Loading from "../components/Loading.jsx";
import Canidate from "../components/Canidate.jsx";
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@material-ui/core";

import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import { useCanidate } from "../hooks/canidates.hooks.js";
import { useMe } from "../hooks/auth.hooks.js";
import {
  useUpdateCanidate,
  useDeleteCanidate,
} from "../hooks/canidates.hooks.js";
import useForm from "../hooks/useForm.js";
import { useHistory } from "react-router-dom";

export default function CanidatePage() {
  const { canidateId } = useParams();
  const token = useAuth();
  const { data: canidate, isFetching } = useCanidate(token, canidateId);
  const { data: user } = useMe();

  return (
    <>
      <BackNavBar />
      {user &&
        canidate &&
        canidate?.success &&
        user.data._id === canidate.data.eventId.creator && (
          <CanidateControls canidate={canidate.data} />
        )}
      {isFetching && <Loading />}
      {canidate && canidate?.success && <Canidate canidate={canidate.data} />}
    </>
  );
}

function CanidateControls({ canidate }) {
  const [updateCanidateDialogOpen, setUpdateCanidateDialogOpen] = useState(
    false
  );
  const [deleteCanidateDialogOpen, setDeleteCanidateDialogOpen] = useState(
    false
  );

  return (
    <>
      <Grid container justify="flex-end">
        <Box marginY={2}>
          <ButtonGroup variant="outlined" color="primary">
            <Button onClick={() => setUpdateCanidateDialogOpen(true)}>
              Update Canidate
            </Button>
            <Button onClick={() => setDeleteCanidateDialogOpen(true)}>
              Delete Caniadte
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
      <UpdateCanidateDialog
        open={updateCanidateDialogOpen}
        handleClose={() => setUpdateCanidateDialogOpen(false)}
        canidate={canidate}
      />
      <DeleteCanidateDialog
        open={deleteCanidateDialogOpen}
        handleChange={() => setDeleteCanidateDialogOpen(false)}
        canidate={canidate}
      />
    </>
  );
}

function UpdateCanidateDialog({ open, handleClose, canidate }) {
  const { inputs, handleChange, clearForm } = useForm({
    name: canidate.name,
    description: canidate.description,
  });
  const token = useAuth();
  const { mutate, isLoading } = useUpdateCanidate(token, canidate._id);

  const handleUpdate = async () => {
    await mutate(inputs);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update canidate</DialogTitle>
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
            label="Canidate Description"
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
        <Button color="primary" onClick={handleUpdate} disabled={isLoading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DeleteCanidateDialog({ open, handleClose, canidate }) {
  const token = useAuth();
  const { mutate, isLoading } = useDeleteCanidate(
    token,
    canidate._id,
    canidate.eventId._id
  );
  const history = useHistory();

  const handleDelete = async () => {
    await mutate();
    history.push(`/events/${canidate.eventId._id}`);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Delete Canidate</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete canidate.
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
