import { z } from "zod";

export const EMAIL_DOMAIN = "@zod.com";
export const EMAIL_DOMAIN_ERROR = "Only @zod.com emails are allowed";
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_REGEX = new RegExp(/\d/);
export const PASSWORD_REGEX_ERROR = "Password should contain at least on number (0123456789)."