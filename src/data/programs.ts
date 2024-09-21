/* eslint-disable @typescript-eslint/no-explicit-any */
import { createProgram, deleteProgram, getAllPrograms, updateProgram } from "@/actions/programs";
import { ProgramValidators } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetProgram() {
  return useQuery({
    queryFn: async () => getAllPrograms(),
    queryKey: ["programs"],
  });
}

export function useSaveProgram(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof ProgramValidators>) => {
      if (initialData) {
        // Update the year level
        return updateProgram(values, initialData.id);
      } else {
        // Create a new year level
        return createProgram(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["programs"] }); // Invalidate and refetch year levels
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (programId: string) => {
      return deleteProgram(programId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["programs"] }); // Invalidate and refetch year levels
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
