import { useMutation, useQueryCache } from "react-query";
import { deleteCanidate } from "../../utils/api/api";

export function useDeleteCanidate(token, canidateId, eventId) {
  const queryCache = useQueryCache();

  const deleteCanidateMutation = () => {
    return deleteCanidate(token, canidateId);
  };

  const [mutate, { isLoading, data }] = useMutation(deleteCanidateMutation, {
    onSuccess: () => queryCache.invalidateQueries(`events-${eventId}`),
  });

  return { mutate, isLoading, data };
}
