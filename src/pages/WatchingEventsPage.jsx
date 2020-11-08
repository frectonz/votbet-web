import React from "react";
import EventCard from "../components/EventCard.jsx";
import Loading from "../components/Loading.jsx";

import { useEventsBeingWatched } from "../hooks/events.hooks.js";
import useAuth from "../hooks/useAuth.js";

export default function WatchingEventsPage() {
  const token = useAuth();

  const { data, isFetching } = useEventsBeingWatched(token);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div>
      {data &&
        data?.data?.map((event) => {
          return <EventCard key={event._id} {...event} />;
        })}
    </div>
  );
}
