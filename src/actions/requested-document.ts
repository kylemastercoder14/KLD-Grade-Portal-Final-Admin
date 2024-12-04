/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const getAllRequestedDocuments = async () => {
  try {
    const data = await db.documentRequest.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        student: true,
      },
    });

    if (!data) {
      return { error: "No requested found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const confirmDocument = async (documentId: string) => {
  if (!documentId) {
    return { error: "Document ID is required." };
  }

  try {
    const documents = await db.documentRequest.update({
      data: {
        status: "Confirmed",
      },
      where: {
        id: documentId,
      },
    });

    return { success: "Document confirmed successfully", documents };
  } catch (error: any) {
    return {
      error: `Failed to confirm document. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteDocument = async (documentId: string) => {
  if (!documentId) {
    return { error: "Document ID is required." };
  }

  try {
    const document = await db.documentRequest.delete({
      where: {
        id: documentId,
      },
    });

    return { success: "Document deleted successfully", document };
  } catch (error: any) {
    return {
      error: `Failed to delete document. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
