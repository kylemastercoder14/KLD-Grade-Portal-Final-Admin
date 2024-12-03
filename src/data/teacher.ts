/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  archiveTeacher,
  createTeacher,
  getAllArchivedTeachers,
  getAllTeachers,
  retrieveTeacher,
  updateTeacher,
} from "@/actions/teacher";
import { TeacherValidator } from "@/functions/validators/teacher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetTeacher() {
  return useQuery({
    queryFn: async () => getAllTeachers(),
    queryKey: ["teachers"],
  });
}

export function useGetArchivedTeacher() {
  return useQuery({
    queryFn: async () => getAllArchivedTeachers(),
    queryKey: ["archived-teachers"],
  });
}

export function useSaveTeacher(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof TeacherValidator>) => {
      if (initialData) {
        // Update the teacher
        return updateTeacher(values, initialData.id);
      } else {
        // Create a new teacher
        return createTeacher(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useArchiveTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      return archiveTeacher(teacherId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useRetrieveTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      return retrieveTeacher(teacherId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
