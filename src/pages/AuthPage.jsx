import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";

export default function AuthPage() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid container spacing={4}>
        <Grid item>
          <Link to="/auth/register">
            <Button variant="contained" color="primary">
              <Typography variant="h4">Register</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/auth/login">
            <Button variant="contained" color="primary">
              <Typography variant="h4">Log In</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
