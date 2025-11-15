export type UserRole = "teacher" | "student";

export interface UserData {
  id: number | string;
  name: string;
  email: string;
  email_verified_at: Date | null;
  iam_a: UserRole;
  created_at: Date;
  updated_at: Date;
}
