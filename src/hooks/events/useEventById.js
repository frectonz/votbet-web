import { useQuery } from "react-query";
import useAuth from "../useAuth.js";
import { getEventById } from "../../utils/api/api";

export function useEventById(id) {
  const token = useAuth();

  const fetchResults = () => {
    return getEventById(token, id);
  };

  const { data, isFetching, status } = useQuery(`event-${id}`, fetchResults);
  return { data, isFetching, status };
}
