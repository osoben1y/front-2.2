export type Gender = "male" | "female";

export interface UserForm {
  id: number;
  fullName: string;
  email: string;
  password: string;
  birthDate: string;
  gender: Gender;
}
