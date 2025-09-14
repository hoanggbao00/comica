import { getStyles } from "@/api/style";
import { useQuery } from "@tanstack/react-query";

export const useGetStyles = () => {
  return useQuery({
    queryKey: ["styles"],
    queryFn: () => getStyles(),
  });
};
