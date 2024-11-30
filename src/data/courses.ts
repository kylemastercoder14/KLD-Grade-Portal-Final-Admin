/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "@/actions/courses";
import { CourseValidators } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetCourses() {
  return useQuery({
    queryFn: async () => getAllCourses(),
    queryKey: ["courses"],
  });
}

export function useSaveCourse(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof CourseValidators>) => {
      if (initialData) {
        // Update the Course
        return updateCourse(values, initialData.id);
      } else {
        // Create a new Course
        return createCourse(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      return deleteCourse(courseId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      } else {
        toast.error(data.error);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
