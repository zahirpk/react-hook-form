import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(3).max(20),
  password: z.string().min(3),
  email: z.string().email(),
});

export type Inputs = z.infer<typeof signUpSchema>;

/* .regex(/^[a-zA-Z]+$/, { message: "Name must contain only alphabetic characters",}) */
