import { userRepository } from "../repository/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  username?: string;
  email: string;
  password: string;
}

export const userServices = {
  createClientUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  },

  signInUser: async ({ email, password }: CreateUserInput) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials! Senha errada");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.AUTH_SECRET!,
      { expiresIn: "3d" }
    );

    return {
      token,
    };
  },

  createTechUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: "TECH",
    });

    return newUser;
  },
};
