import { useMutation, useQueryCache } from "react-query";
import { addBio } from "../../utils/api/api";

export function useAddBio(token) {
  const queryCache = useQueryCache();

  const addBioMutaion = (bio) => {
    return addBio(token, bio);
  };

  const [mutate, { isLoading, data }] = useMutation(addBioMutaion, {
    onSuccess: () => {
      queryCache.invalidateQueries("me");
    },
  });

  return { mutate, isLoading, data };
}
