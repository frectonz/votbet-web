import { useMutation, useQueryCache } from "react-query";
import { toggleVoteToCanidate } from "../../utils/api/api";

export function useVoteCanidate(token, canidateId) {
  const queryCache = useQueryCache();

  const toggleVoteToCanidateMutation = () => {
    return toggleVoteToCanidate(token, canidateId);
  };

  const [mutate, { isLoading, data }] = useMutation(
    toggleVoteToCanidateMutation,
    {
      onSuccess: () => queryCache.invalidateQueries(`canidate-${canidateId}`),
    }
  );

  return { mutate, isLoading, data };
}
