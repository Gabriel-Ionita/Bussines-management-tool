import { useQuery } from "@tanstack/react-query";
import { getServicii } from "../../services/apiservicii";

export function useServicii() {
  const {
    isLoading,
    data: serviciu,
    error,
  } = useQuery({
    queryKey: ["serviciu"],
    queryFn: getServicii,
  });
  return { isLoading, serviciu, error };
}
