import React from "react";

import { Box, Grid, CircularProgress } from "@material-ui/core";

export default function Loading() {
  return (
    <Box marginY={5}>
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    </Box>
  );
}
