import React from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
} from "@material-ui/core";
import { Visibility, HowToVote } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import dayjs from "dayjs";

export default function EventCard({
  _id,
  name,
  description,
  totalWatchers,
  totalVotes,
  startDate,
  endDate,
}) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/events/${_id}`);
  };

  return (
    <Box marginY={2}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <Box padding={2}>
            <CardContent>
              <Box marginY={2}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </Box>

              <Grid container>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-evenly"
                  xs={3}
                >
                  <Visibility color="primary" />
                  {totalWatchers}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-evenly"
                  xs={3}
                >
                  <HowToVote color="primary" />
                  {totalVotes}
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-evenly"
                  xs={3}
                >
                  <Typography variant="caption">
                    Start {dayjs(startDate).format("MMM DD, YYYY")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  alignItems="center"
                  justify="space-evenly"
                  xs={3}
                >
                  <Typography variant="caption">
                    End {dayjs(endDate).format("MMM DD, YYYY")}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}

dayjs("2019-01-25").format("DD/MM/YYYY");
