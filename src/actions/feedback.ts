"use server";

import db from "@/lib/db";

export const getAllFeedback = async () => {
  try {
    const data = await db.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      return { error: "No feedback found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};
