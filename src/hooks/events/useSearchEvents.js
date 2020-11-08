import { useMutation } from "react-query";
import { searchEvents } from "../../utils/api/api.js";

export function useSearchEvents(token) {
  const searchEventsMutaion = (searchString) =>
    searchEvents(token, 20, searchString);

  const [mutate, { data, isLoading }] = useMutation(searchEventsMutaion);

  return { mutate, data, isLoading };
}
