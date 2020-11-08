import { useMutation } from "react-query";
import { login } from "../../utils/api/api";

export function useLogin() {
  const [mutate, { isLoading, data }] = useMutation(login);

  return { mutate, isLoading, data };
}
