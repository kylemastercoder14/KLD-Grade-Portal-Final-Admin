/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSection, deleteSection, getAllSections, updateSection } from "@/actions/sections";
import { SectionValidators } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetSection() {
  return useQuery({
    queryFn: async () => getAllSections(),
    queryKey: ["sections"],
  });
}

export function useSaveSection(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof SectionValidators>) => {
      if (initialData) {
        // Update the section
        return updateSection(values, initialData.id);
      } else {
        // Create a new section
        return createSection(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionId: string) => {
      return deleteSection(sectionId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["sections"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
