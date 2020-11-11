import React from "react";

import {
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { Visibility, HowToVote } from "@material-ui/icons";
import CommentCard from "./CommentCard.jsx";
import CanidateCard from "./CanidateCard.jsx";
import CommentForm from "./CommentForm.jsx";

import dayjs from "dayjs";
import useAuth from "../hooks/useAuth.js";
import { useWatchEvent } from "../hooks/events.hooks";
import { useMe } from "../hooks/auth/useMe.js";

const isWatching = (userId, watches = []) => {
  for (const watch of watches) {
    if (watch.watcher === userId) {
      return true;
    }
  }
};

export default function Event({
  _id,
  name,
  description,
  totalWatchers,
  totalVotes,
  createdAt,
  startDate,
  endDate,
  comments,
  canidates,
  watches,
  picture,
}) {
  const token = useAuth();
  const { data: user } = useMe();
  const { mutate, isLoading } = useWatchEvent(token, _id);

  const handleToggleWatch = async () => {
    await mutate();
  };

  return (
    <Box marginY={2}>
      <Paper variant="elevation">
        <Box padding={2}>
          <Box marginBottom={2}>
            <Grid container justify="center">
              <Container maxWidth="sm">
                <img
                  src={picture}
                  alt={name}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </Container>
            </Grid>
          </Box>

          <Box marginY={2}>
            <Typography align="center" variant="h3">
              {name}
            </Typography>
            <Typography align="center" variant="body1">
              {description}
            </Typography>
          </Box>

          <Grid item container justify="center">
            <Grid
              item
              container
              alignItems="center"
              justify="space-around"
              xs={1}
            >
              <Visibility color="primary" />
              <Typography>{totalWatchers}</Typography>
            </Grid>

            <Grid
              item
              container
              alignItems="center"
              justify="space-around"
              xs={1}
            >
              <HowToVote color="primary" />
              <Typography>{totalVotes}</Typography>
            </Grid>

            <Grid item container alignItems="center" justify="flex-end" xs={10}>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleToggleWatch}
                  disabled={isLoading}
                >
                  {isWatching(user?.data?._id, watches) ? "unwatch" : "watch"}
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box marginY={2}>
            <Typography align="center">
              Created at {dayjs(createdAt).format("MMM DD, YYYY")}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Typography align="center">
                Start {dayjs(startDate).format("MMM DD, YYYY")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center">
                End {dayjs(endDate).format("MMM DD, YYYY")}
              </Typography>
            </Grid>
          </Grid>
          {canidates && canidates.length > 0 && (
            <Box marginY={2}>
              <Typography variant="h5">Canidates</Typography>
            </Box>
          )}
          {canidates &&
            canidates.map((canidate) => (
              <CanidateCard key={canidate._id} canidate={canidate} />
            ))}
          {comments && comments.length > 0 && (
            <Box marginY={2}>
              <Typography variant="h5">Comments</Typography>
            </Box>
          )}
          {comments &&
            comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          <CommentForm eventId={_id} />
        </Box>
      </Paper>
    </Box>
  );
}
