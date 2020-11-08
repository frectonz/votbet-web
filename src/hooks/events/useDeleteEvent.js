import { useMutation, useQueryCache } from "react-query";
import { deleteEventById } from "../../utils/api/api";

export function useDeleteEvent(token, id) {
  const queryCache = useQueryCache();

  const deleteEventMutation = () => {
    return deleteEventById(token, id);
  };

  const [mutate, { isLoading, data }] = useMutation(deleteEventMutation, {
    onSuccess: () => queryCache.invalidateQueries("events"),
  });

  return { mutate, isLoading, data };
}
