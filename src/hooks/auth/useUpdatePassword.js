import { useMutation, useQueryCache } from "react-query";
import { updatePassword } from "../../utils/api/api";

export function useUpdatePassword(token) {
  const queryCache = useQueryCache();

  const updatePasswordMutation = ({ newPassword, oldPassword }) => {
    return updatePassword(token, { newPassword, oldPassword });
  };

  const [mutate, { isLoading, data }] = useMutation(updatePasswordMutation, {
    onSuccess: () => {
      queryCache.invalidateQueries("me");
    },
  });

  return { mutate, isLoading, data };
}
