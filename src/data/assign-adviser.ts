/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAssignAdviser, deleteAssignAdviser, getAllAssignAdviser, updateAssignAdviser } from "@/actions/assign-teacher";
import { AssignAdviserValidator } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetAssignAdviser() {
  return useQuery({
    queryFn: async () => getAllAssignAdviser(),
    queryKey: ["assignAdvisers"],
  });
}

export function useSaveAssignAdviser(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof AssignAdviserValidator>) => {
      if (initialData) {
        // Update the assign adviser
        return updateAssignAdviser(values, initialData.id);
      } else {
        // Create a new adviser
        return createAssignAdviser(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["assignAdvisers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteAssignAdviser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assignAdviserId: string) => {
      return deleteAssignAdviser(assignAdviserId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["assignAdvisers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
