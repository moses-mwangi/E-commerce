import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    name: z.string().min(1, "Full name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z.string().min(6, "Confirm password is required"),
    telephone: z
      .string()
      .min(1, "Telephone number is required")
      .regex(/^\d+$/, "Only numbers are allowed"),
    tradeRole: z.enum(["buyer", "seller", "both"], {
      errorMap: () => ({ message: "Trade role is required" }),
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });
