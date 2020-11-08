import { useMutation } from "react-query";
import { createEvent } from "../../utils/api/api";

export const useCreateEvent = () => {
  const [mutate, { isLoading, data, error }] = useMutation(createEvent);

  return { mutate, isLoading, data, error };
};
