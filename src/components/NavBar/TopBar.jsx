import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Votbet</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
