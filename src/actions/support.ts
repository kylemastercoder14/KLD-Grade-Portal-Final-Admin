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
