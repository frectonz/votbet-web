import { useMutation } from "react-query";
import { register } from "../../utils/api/api";

export function useRegister() {
  const [mutate, { isLoading, data }] = useMutation(register);

  return { mutate, isLoading, data };
}
