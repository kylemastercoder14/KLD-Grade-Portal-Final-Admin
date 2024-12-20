/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  confirmDocument,
  deleteDocument,
  getAllRequestedDocuments,
} from "@/actions/requested-document";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetRequestedDocuments() {
  return useQuery({
    queryFn: async () => getAllRequestedDocuments(),
    queryKey: ["requested-documents"],
  });
}

export function useConfirmDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      return confirmDocument(teacherId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["requested-documents"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      return deleteDocument(documentId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["requested-documents"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
