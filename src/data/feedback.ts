import { getAllFeedback } from "@/actions/feedback";
import { useQuery } from "@tanstack/react-query";


export function useGetFeedback() {
    return useQuery({
      queryFn: async () => getAllFeedback(),
      queryKey: ["feedback"],
    });
  }