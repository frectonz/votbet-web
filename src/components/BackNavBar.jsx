import React from "react";

import { AppBar, Toolbar, Grid, IconButton } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export default function BackNavBar() {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={12}>
            <IconButton color="inherit" onClick={handleClick}>
              <ArrowBack />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
