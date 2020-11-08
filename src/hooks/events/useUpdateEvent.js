import { useMutation, useQueryCache } from "react-query";
import { updateEventById } from "../../utils/api/api";

export function useUpdateEvent(token, id) {
  const queryCache = useQueryCache();

  const updateEventMutaion = ({ name, description }) => {
    return updateEventById(token, id, { name, description });
  };

  const [mutate, { isLoading, data }] = useMutation(updateEventMutaion, {
    onSuccess: () => queryCache.invalidateQueries(`event-${id}`),
  });

  return { mutate, isLoading, data };
}
