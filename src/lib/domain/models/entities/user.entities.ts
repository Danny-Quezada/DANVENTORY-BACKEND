import { z } from "zod";
const UserSchema = z.object({
  userId: z.number().int().nonnegative(),
  name: z.string().min(6, "Name must be at least 6 characters long"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  userIdAuth: z.string().optional(),
});

type UserInput = z.infer<typeof UserSchema>;
export default class User {
  userId: number;
  name: string;
  email: string;
  password: string;
  userIdAuth: string;

  constructor(
    userId: number,
    name: string,
    email: string,
    password: string,
    userIdAuth: string
  ) {
    console.log("holaaaaa")
    const validatedData = UserSchema.parse({
      userId,
      name,
      email,
      password,
      userIdAuth,
    });
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.userIdAuth = userIdAuth;
  }
}
