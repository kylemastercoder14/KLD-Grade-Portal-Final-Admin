/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import * as jose from "jose";
import { cookies } from "next/headers";
import bcryptjs from "bcryptjs";

export const createAdmin = async (username: string, password: string) => {
  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    await db.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return { success: "Admin created successfully" };
  } catch (error: any) {
    return {
      error: `Failed to sign in. Please try again. ${error.message || ""}`,
    };
  }
};

export const loginAdmin = async (username: string, password: string) => {
  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const admin = await db.admin.findFirst({
      where: {
        username,
        password
      },
    });

    if (!admin) {
      return { error: "Admin not found" };
    }

    // Create JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg })
      .setExpirationTime("72h")
      .setSubject(admin.id.toString())
      .sign(secret);

    // Set the cookie with the JWT
    cookies().set("Authorization", jwt, {
      httpOnly: true, // Set to true for security
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 3, // Cookie expiration (3 days in seconds)
      sameSite: "strict", // Adjust according to your needs
      path: "/", // Adjust path as needed
    });

    return { token: jwt };
  } catch (error: any) {
    return {
      error: `Failed to sign in. Please try again. ${error.message || ""}`,
    };
  }
};

export const logout = async () => {
  cookies().set("Authorization", "", { maxAge: 0, path: "/" });
};
