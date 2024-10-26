import { z } from "zod";
import { EnumUserRole } from "../../configs/enums";

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  role: z.enum([EnumUserRole.MEMBER, EnumUserRole.OWNER]).default(EnumUserRole.MEMBER),
});

export type IUserRegistrationData = z.infer<typeof userRegistrationSchema>;