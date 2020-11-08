import { useQuery } from "react-query";
import { eventsBeingWatched } from "../../utils/api/api.js";

export function useEventsBeingWatched(token) {
  const fetchEventsBeingWatched = () => {
    return eventsBeingWatched(token);
  };

  const { data, isFetching } = useQuery(
    "events-watching",
    fetchEventsBeingWatched
  );

  return { data, isFetching };
}
