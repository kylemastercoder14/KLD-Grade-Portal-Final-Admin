/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAnnouncement, deleteAnnouncement, getAllAnnouncements, updateAnnouncement } from "@/actions/announcement";
import { AnnouncementValidator } from "@/functions/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetAnnouncement() {
  return useQuery({
    queryFn: async () => getAllAnnouncements(),
    queryKey: ["announcements"],
  });
}

export function useSaveAnnouncement(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof AnnouncementValidator>) => {
      if (initialData) {
        return updateAnnouncement(values, initialData.id);
      } else {
        return createAnnouncement(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["announcements"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (announcementId: string) => {
      return deleteAnnouncement(announcementId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["announcements"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
