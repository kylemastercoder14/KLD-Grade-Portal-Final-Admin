/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  confirmSupport,
  deleteSupport,
  getAllSupport,
} from "@/actions/support";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetSupport() {
  return useQuery({
    queryFn: async () => getAllSupport(),
    queryKey: ["support"],
  });
}

export function useConfirmSupport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supportId: string) => {
      return confirmSupport(supportId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["support"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteSupport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (supportId: string) => {
      return deleteSupport(supportId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["support"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
