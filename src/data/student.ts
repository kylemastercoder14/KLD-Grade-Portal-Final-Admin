/* eslint-disable @typescript-eslint/no-explicit-any */
import { archiveStudent, createStudent, getAllStudents, updateStudent } from "@/actions/student";
import { StudentValidator } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGeStudent() {
  return useQuery({
    queryFn: async () => getAllStudents(),
    queryKey: ["students"],
  });
}

export function useSaveStudent(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof StudentValidator>) => {
      if (initialData) {
        // Update the student
        return updateStudent(values, initialData.id);
      } else {
        // Create a new student
        return createStudent(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["students"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useArchiveStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: string) => {
      return archiveStudent(studentId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["students"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
