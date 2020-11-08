import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Update } from "@material-ui/icons";

import dayjs from "dayjs";
import { useMe } from "../hooks/auth.hooks";
import useForm from "../hooks/useForm.js";
import { useUpdateComment } from "../hooks/comments.hooks.js";
import useAuth from "../hooks/useAuth";

export default function CommentCard({ comment }) {
  const { data: user } = useMe();

  return (
    <Box marginY={2}>
      <Card>
        <CardContent>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Comment By {comment.creator.name} Posted on{" "}
              {dayjs(comment.createdAt).format("MMM, DD, YYYY")}
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
          </Box>
          {user && user.data._id === comment.creator._id ? (
            <CommentControls comment={comment} />
          ) : null}
        </CardContent>
      </Card>
    </Box>
  );
}

function CommentControls({ comment }) {
  const [updateCommentDialogOpen, setUpdateCommentDialogOpen] = useState(false);

  return (
    <>
      <Grid container justify="flex-end">
        <IconButton
          color="primary"
          onClick={() => setUpdateCommentDialogOpen(true)}
        >
          <Update />
        </IconButton>
      </Grid>
      <UpdateCommentDialog
        open={updateCommentDialogOpen}
        handleClose={() => setUpdateCommentDialogOpen(false)}
        comment={comment}
      />
    </>
  );
}

function UpdateCommentDialog({ open, handleClose, comment }) {
  const { inputs, handleChange, clearForm } = useForm({
    text: comment.text,
  });
  const token = useAuth();
  const { mutate, isLoading } = useUpdateComment(
    token,
    comment._id,
    comment.eventId
  );

  const handleSubmit = async () => {
    await mutate(inputs);
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Update comment</DialogTitle>
      <DialogContent>
        <Box marginY={2}>
          <TextField
            autoFocus
            name="text"
            label="Your comment"
            type="text"
            value={inputs["text"]}
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
