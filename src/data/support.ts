import { getAllSupport } from "@/actions/support";
import { useQuery } from "@tanstack/react-query";


export function useGetSupport() {
    return useQuery({
      queryFn: async () => getAllSupport(),
      queryKey: ["support"],
    });
  }