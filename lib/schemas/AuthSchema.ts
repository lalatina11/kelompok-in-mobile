import { z } from "zod";

export const assignRoleSchema = z
  .enum(["teacher", "student"])
  .refine((value) => {
    if (value === undefined) {
      throw new Error("Harap pilih jenis pengguna");
    }
    return true;
  }, "Harap pilih jenis pengguna");

export type RoleType = z.infer<typeof assignRoleSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nama pengguna minimal 3 karakter")
    .max(255, "Nama Pengguna maksimal 255 karakter"),
  email: z.email("Mohon isikan email yang valid"),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(32, "Kata sandi maksimal 32 karakter"),
  confirmPassword: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(32, "Kata sandi maksimal 32 karakter"),
  iam_a: assignRoleSchema,
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = registerSchema.omit({
  name: true,
  iam_a: true,
  confirmPassword: true,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
