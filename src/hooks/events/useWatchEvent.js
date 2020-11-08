import { useMutation, useQueryCache } from "react-query";
import { watchEventById } from "../../utils/api/api";

export function useWatchEvent(token, id) {
  const queryCache = useQueryCache();

  const watchEventMutaion = () => {
    return watchEventById(token, id);
  };

  const [mutate, { isLoading, data }] = useMutation(watchEventMutaion, {
    onSuccess: () => queryCache.invalidateQueries(`event-${id}`),
  });

  return { mutate, isLoading, data };
}
