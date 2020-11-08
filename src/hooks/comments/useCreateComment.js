import { useMutation, useQueryCache } from "react-query";
import { createComment } from "../../utils/api/api.js";

export function useCreateComment(token, eventId) {
  const queryCache = useQueryCache();

  const createCommentMutation = ({ text }) => {
    return createComment(token, { text, eventId });
  };

  const [mutate, { isLoading, data }] = useMutation(createCommentMutation, {
    onSuccess: () => queryCache.invalidateQueries(`event-${eventId}`),
  });

  return { mutate, isLoading, data };
}
