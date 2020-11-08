import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";

import { useVoteCanidate } from "../hooks/canidates.hooks.js";
import useAuth from "../hooks/useAuth.js";
import { getEventType } from "../utils/getEventType.js";

import dayjs from "dayjs";

export default function Canidate({ canidate }) {
  const token = useAuth();
  const { mutate, isLoading } = useVoteCanidate(token, canidate._id);

  const toggleVote = async () => {
    await mutate();
  };

  const eventType = getEventType(
    canidate?.eventId?.startDate,
    canidate?.eventId?.endDate
  );
  return (
    <Box marginY={2}>
      <Paper variant="outlined">
        <Box padding={2}>
          <Box marginY={2}>
            <Typography variant="h4" align="center">
              {canidate.name}
            </Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="body1" align="center">
              {canidate.description}
            </Typography>
          </Box>
          <Grid container>
            <Grid
              container
              item
              xs={2}
              alignItems="center"
              justify="space-around"
            >
              <HowToVote color="primary" />
              <Typography color="primary">{canidate.totalVotes}</Typography>
            </Grid>
            {eventType === "ONGOING" && (
              <Grid
                container
                item
                xs={10}
                alignItems="center"
                justify="flex-end"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleVote}
                  disabled={isLoading}
                >
                  Toggle Vote
                </Button>
              </Grid>
            )}
          </Grid>
          {eventType === "DUE" && (
            <Box marginY={2}>
              <Typography variant="h6" align="right">
                Voting will start on{" "}
                {dayjs(canidate.eventId.startDate).format("MMM DD, YYYY")}.
              </Typography>
            </Box>
          )}
          {eventType === "ENDED" && (
            <Box marginY={2}>
              <Typography variant="h6" align="right">
                Voting has ended.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
