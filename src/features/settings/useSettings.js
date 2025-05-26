import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: setari,
    error,
  } = useQuery({
    queryKey: ["setari"],
    queryFn: getSettings,
  });
  return { isLoading, setari, error };
}
