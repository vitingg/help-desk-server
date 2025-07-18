import { userRepository } from "../repository/user-repository";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const userServices = {
  createClientUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Este e-mail já esta em uso!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  },

  createTechUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("Este e-mail já esta em uso!");
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
