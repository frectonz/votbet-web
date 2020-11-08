import { useMutation, useQueryCache } from "react-query";
import { deleteComment } from "../../utils/api/api";

export function useDeleteComment(token, commentId, eventId) {
  const queryCache = useQueryCache();

  const deleteCommentMutation = () => {
    return deleteComment(token, commentId);
  };

  const [mutate, { isLoading, data }] = useMutation(deleteCommentMutation, {
    onSuccess: () => {
      queryCache.invalidateQueries(`events-${eventId}`);
    },
  });

  return { mutate, isLoading, data };
}
