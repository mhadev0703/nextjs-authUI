"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constants";
import db from "../lib/db";
import { redirect } from "next/navigation";
import getSession from "../lib/session";

const createAccountSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase(),
  username: z
    .string({
      invalid_type_error: "Username must be a string!",
      required_error: "This field is required.",
    })
    .min(USERNAME_MIN_LENGTH)
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long` })
    .regex(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERROR }),
  confirm_password: z
    .string()
    .min(PASSWORD_MIN_LENGTH),
})
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
      });
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
      });
    }
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await createAccountSchema.safeParseAsync(data);

  if (!result.success) {
    console.log("Validation errors:", result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log("User created: ", user);
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}