import React from "react";
import { Box, Grid, IconButton, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import useForm from "../hooks/useForm.js";
import { useSearchEvents } from "../hooks/events.hooks.js";
import useAuth from "../hooks/useAuth.js";

export default function SearchEvent() {
  const { inputs, handleChange } = useForm({
    searchString: "",
  });
  const token = useAuth();
  const { mutate, data, isLoading } = useSearchEvents(token);

  const handleSearch = async () => {
    await mutate(inputs?.searchString);
    console.log(data);
  };

  return (
    <>
      <Box marginBottom={2}>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Search Events"
              name="searchString"
              value={inputs["searchString"]}
              onChange={handleChange}
            />
          </Grid>
          <Grid container item xs={2} justify="center" alignItems="center">
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

function SearchEventsResult() {}
