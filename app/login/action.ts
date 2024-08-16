"use server";

import { z } from "zod";
import { 
  USERNAME_MIN_LENGTH, 
  PASSWORD_MIN_LENGTH, 
  PASSWORD_REGEX, 
  PASSWORD_REGEX_ERROR, 
  EMAIL_DOMAIN, 
  EMAIL_DOMAIN_ERROR, 
} from "../lib/constants";

const loginSchema = z.object({
  email: z
    .string()
    .regex(new RegExp(`${EMAIL_DOMAIN}$`), { message: EMAIL_DOMAIN_ERROR }) 
    .email({ message: EMAIL_DOMAIN_ERROR }), 
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, { message: `Username should be at least ${USERNAME_MIN_LENGTH} characters long` }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: `Password should be at least ${PASSWORD_MIN_LENGTH} characters long` })
    .refine(value => PASSWORD_REGEX.test(value), { message: PASSWORD_REGEX_ERROR }),
});

export async function handleForm(prevState: any, formData: FormData) {
  const formDataObject = Object.fromEntries(formData.entries());

  const validationResult = loginSchema.safeParse(formDataObject);

  if (!validationResult.success) {
    const fieldErrors: { [key: string]: string[] } = {};

    validationResult.error.errors.forEach((error) => {
      const field = error.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field].push(error.message);
    });

    return {
      errors: fieldErrors,
    };
  }

  return {
    errors: {},
  };
}