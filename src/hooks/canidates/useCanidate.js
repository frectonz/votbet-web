import { useQuery } from "react-query";
import { getCanidate } from "../../utils/api/api";

export function useCanidate(token, canidateId) {
  const getCanidateMutaion = () => {
    return getCanidate(token, canidateId);
  };

  const { data, isFetching, error } = useQuery(
    `canidate-${canidateId}`,
    getCanidateMutaion
  );

  return { data, isFetching, error };
}
