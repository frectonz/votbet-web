import { useMutation, useQueryCache } from "react-query";
import { uploadImage } from "../../utils/api/api";

export function useUploadImage(token, id) {
  const queryCache = useQueryCache();

  const uploadImageMutation = (base64Picture) => {
    return uploadImage(token, id, base64Picture);
  };

  const [mutate, { isLoading, data }] = useMutation(uploadImageMutation, {
    onSuccess: () => queryCache.invalidateQueries(`event-${id}`),
  });

  return { mutate, isLoading, data };
}
