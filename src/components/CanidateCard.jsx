import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";

export default function CanidateCard({ canidate }) {
  const history = useHistory();

  const goto = (id) => {
    history.push(`/canidates/${id}`);
  };

  return (
    <Box marginY={2}>
      <Card>
        <CardActionArea onClick={() => goto(canidate._id)}>
          <Box padding={2}>
            <CardContent>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h6">{canidate.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {canidate.description}
                  </Typography>
                </Grid>

                <Grid
                  container
                  item
                  alignItems="center"
                  justify="space-around"
                  xs={2}
                >
                  <Box>
                    <HowToVote color="primary" />
                  </Box>
                  <Typography>{canidate.totalVotes}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}
