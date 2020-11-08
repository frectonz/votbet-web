import { getAllEvents } from "../../utils/api/api.js";
import { useInfiniteQuery } from "react-query";
import useAuth from "../useAuth.js";

export function useEvents({ filter, sortBy, limit }) {
  const token = useAuth();

  const fetchResults = (key, page = 0) => {
    return getAllEvents(token, { filter, sortBy, limit, page });
  };

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery("events", fetchResults, {
    getFetchMore: (lastPage, allPages) => lastPage?.pagination?.next?.page,
  });

  return {
    data,
    isFetching,
    isFetchingMore,
    status,
    fetchMore,
    canFetchMore,
  };
}
