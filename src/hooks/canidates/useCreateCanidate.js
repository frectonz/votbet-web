import { useMutation, useQueryCache } from "react-query";
import { createCanidate } from "../../utils/api/api";

export function useCreateCanidate(token, eventId) {
  const cache = useQueryCache();

  const createCanidateMutaion = ({ name, description }) => {
    return createCanidate(token, { name, description, eventId });
  };

  const [mutate, { isLoading, data }] = useMutation(createCanidateMutaion, {
    onSuccess: () => {
      cache.invalidateQueries(`event-${eventId}`);
    },
  });

  return { mutate, isLoading, data };
}
