/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AnnouncementValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

export const getAllAnnouncements = async () => {
  try {
    const data = await db.announcement.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!data) {
      return { error: "No announcements found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createAnnouncement = async (
  values: z.infer<typeof AnnouncementValidator>
) => {
  const validatedField = AnnouncementValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description, image } = validatedField.data;

  try {
    const announcement = await db.announcement.create({
      data: {
        name,
        description,
        image: image ?? "",
      },
    });

    return { success: "Announcement created successfully", announcement };
  } catch (error: any) {
    return {
      error: `Failed to create announcement. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateAnnouncement = async (
  values: z.infer<typeof AnnouncementValidator>,
  announcementId: string
) => {
  if (!announcementId) {
    return { error: "Announcement ID is required." };
  }

  const validatedField = AnnouncementValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description, image } = validatedField.data;

  try {
    const announcement = await db.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        name,
        description,
        image,
      },
    });

    return { success: "Announcement updated successfully", announcement };
  } catch (error: any) {
    return {
      error: `Failed to update announcement. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteAnnouncement = async (announcementId: string) => {
  if (!announcementId) {
    return { error: "Announcement ID is required." };
  }

  try {
    const announcement = await db.announcement.delete({
      where: {
        id: announcementId,
      },
    });

    return { success: "Announcement deleted successfully", announcement };
  } catch (error: any) {
    return {
      error: `Failed to delete announcement. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
