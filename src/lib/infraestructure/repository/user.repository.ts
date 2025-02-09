import IUserInterface from "../../domain/interfaces/iUser.interface";
import User from "../../domain/models/entities/user.entities";
import { pool } from "../../domain/db/postgressDB";
import bcrypt from "bcrypt";
import { z } from "zod";
export default class UserRepository implements IUserInterface {
  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const { rows } = await pool.query(query, [email]);

      if (rows.length === 0) {
        throw new Error("User not found");
      }

      const user = rows[0] as User;

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect password or email.");
      }

      user.password = "";
      return user;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        throw new Error(`Errores de validación: ${errorMessages}`);
      } else {
        throw new Error(`${error.message}`);
      }
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const { rows } = await pool.query(
        "select * from users where userid = $1",
        [id]
      );
      return rows[0] as User;
    } catch (error) {
      throw error;
    }
  }
  async create(t: User): Promise<User> {
    try {
      const existEmail = await this.verifyEmail(t.email);
      if (existEmail) {
        throw new Error("Email already exists");
      }
      const saltRounds = Number.parseInt(process.env.SALT_ROUNDS!);
      const hashedPassword = await bcrypt.hash(t.password, saltRounds);

      const { rows } = await pool.query(
        "INSERT INTO users (name,email, password, useridauth) values($1, $2, $3, $4) RETURNING *",
        [t.name, t.email, hashedPassword, t.userIdAuth || "value"]
      );

      return rows[0] as User;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        throw new Error(`validation errors: ${errorMessages}`);
      } else {
        throw new Error(`${error.message}`);
      }
    }
  }

  async verifyEmail(email: string): Promise<Boolean> {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  update(t: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(deleteById: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  read(readById: number): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
