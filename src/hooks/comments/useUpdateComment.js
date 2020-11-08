import { useMutation, useQueryCache } from "react-query";
import { updateComment } from "../../utils/api/api.js";

export function useUpdateComment(token, commentId, eventId) {
  const cache = useQueryCache();

  const updateCommentMutaion = ({ text }) => {
    return updateComment(token, commentId, { text });
  };

  const [mutate, { isLoading, data }] = useMutation(updateCommentMutaion, {
    onSuccess: () => {
      cache.invalidateQueries(`event-${eventId}`);
    },
  });

  return { mutate, isLoading, data };
}
