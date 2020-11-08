import { useQuery } from "react-query";
import useAuth from "../useAuth.js";
import { getMe } from "../../utils/api/api";

export function useMe() {
  const token = useAuth();

  const fetchResults = () => {
    return getMe(token);
  };

  const { data, isFetching, status } = useQuery("me", fetchResults);
  return { data, isFetching, status };
}
