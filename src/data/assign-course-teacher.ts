/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAssignCourseTeacher, deleteAssignCourseTeacher, getAllAssignCoursTeacher, updateAssignCourseTeacher } from "@/actions/assign-course-teacher";
import { AssignCourseTeacherValidator } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetAssignCourseTeacher() {
  return useQuery({
    queryFn: async () => getAllAssignCoursTeacher(),
    queryKey: ["assignCourseTeacher"],
  });
}

export function useSaveAssignCourseTeacher(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof AssignCourseTeacherValidator>) => {
      if (initialData) {
        // Update the assign course teacher
        return updateAssignCourseTeacher(values, initialData.id);
      } else {
        // Create a new course teacher
        return createAssignCourseTeacher(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["assignCourseTeacher"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteAssignCourseTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assignCourseTeacherId: string) => {
      return deleteAssignCourseTeacher(assignCourseTeacherId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["assignCourseTeacher"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
