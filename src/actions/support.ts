/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";

export const getAllSupport = async () => {
  try {
    const data = await db.support.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      return { error: "No support found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const confirmSupport = async (supportId: string) => {
  if (!supportId) {
    return { error: "Support ID is required." };
  }

  try {
    const support = await db.support.update({
      data: {
        status: "Completed",
      },
      where: {
        id: supportId,
      },
    });

    return { success: "Support confirmed successfully", support };
  } catch (error: any) {
    return {
      error: `Failed to confirm support. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteSupport = async (supportId: string) => {
  if (!supportId) {
    return { error: "Support ID is required." };
  }

  try {
    const support = await db.support.delete({
      where: {
        id: supportId,
      },
    });

    return { success: "Support deleted successfully", support };
  } catch (error: any) {
    return {
      error: `Failed to delete support. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
