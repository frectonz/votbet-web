import React, { Fragment, useState } from "react";
import { Box, Fab, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EventModel from "../components/EventModal.jsx";
import EventCard from "../components/EventCard.jsx";
import Loading from "../components/Loading.jsx";
import { useEvents } from "../hooks/events.hooks.js";

export default function EventsListPage() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const {
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useEvents({
    filter: "ALL",
    limit: 10,
    sortBy: "CREATION",
  });

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Box>
      {data &&
        data.map((events, index) => {
          return (
            <Fragment key={index}>
              {events?.data &&
                events?.data.map((event) => {
                  return <EventCard key={event._id} {...event} />;
                })}
            </Fragment>
          );
        })}
      {isFetchingMore && <Loading />}

      <Box marginY={5}>
        <Button
          variant="contained"
          disabled={isFetching || !canFetchMore}
          onClick={() => fetchMore()}
        >
          Load More
        </Button>
      </Box>

      <EventModel open={open} handleClose={handleClose} />
      <Fab
        color="primary"
        aria-label="add event"
        style={{ position: "fixed", bottom: "1%", right: "1%" }}
        onClick={handleOpen}
      >
        <Add />
      </Fab>
    </Box>
  );
}
