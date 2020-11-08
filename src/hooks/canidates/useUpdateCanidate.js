import { useMutation, useQueryCache } from "react-query";
import { updateCanidate } from "../../utils/api/api";

export function useUpdateCanidate(token, canidateId) {
  const cache = useQueryCache();

  const updateCanidateMutaion = ({ name, description }) => {
    return updateCanidate(token, canidateId, { name, description });
  };

  const [mutate, { isLoading, data }] = useMutation(updateCanidateMutaion, {
    onSuccess: () => {
      cache.invalidateQueries(`canidate-${canidateId}`);
    },
  });

  return { mutate, isLoading, data };
}
