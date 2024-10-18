/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSemester, deleteSemester, getAllSemesters, updateSemester } from "@/actions/semester";
import { SemesterValidator } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetSemester() {
  return useQuery({
    queryFn: async () => getAllSemesters(),
    queryKey: ["semesters"],
  });
}

export function useSaveSemester(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof SemesterValidator>) => {
      if (initialData) {
        // Update the semester
        return updateSemester(values, initialData.id);
      } else {
        // Create a new semester
        return createSemester(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["semesters"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteSemester() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (semesterId: string) => {
      return deleteSemester(semesterId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["semesters"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
