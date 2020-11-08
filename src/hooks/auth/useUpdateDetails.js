import { useMutation, useQueryCache } from "react-query";
import { updateDetails } from "../../utils/api/api";

export function useUpdateDetails(token) {
  const queryCache = useQueryCache();

  const updateDetailsMutation = ({ name, email }) => {
    return updateDetails(token, { name, email });
  };

  const [mutate, { isLoading, data }] = useMutation(updateDetailsMutation, {
    onSuccess: () => {
      queryCache.invalidateQueries("me");
    },
  });

  return { mutate, isLoading, data };
}
