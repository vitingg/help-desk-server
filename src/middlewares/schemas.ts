import z from "zod";

export const createUserSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(5),
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
