/* eslint-disable @typescript-eslint/no-explicit-any */
import { createYearLevel, deleteYearLevel, getAllYearLevel, updateYearLevel } from "@/actions/year-level";
import { YearLevelValidators } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetYearLevel() {
  return useQuery({
    queryFn: async () => getAllYearLevel(),
    queryKey: ["yearLevels"],
  });
}

export function useSaveYearLevel(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof YearLevelValidators>) => {
      if (initialData) {
        // Update the year level
        return updateYearLevel(values, initialData.id);
      } else {
        // Create a new year level
        return createYearLevel(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["yearLevels"] }); // Invalidate and refetch year levels
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteYearLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (yearLevelId: string) => {
      return deleteYearLevel(yearLevelId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["yearLevels"] }); // Invalidate and refetch year levels
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
