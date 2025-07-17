import { userClientRepository } from "../repository/client-repository";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const userClientService = {
  createUser: async ({ username, email, password }: CreateUserInput) => {
    // const existingUser = await userClientRepository.findByEmail(email);
    // if (existingUser) {
    //   throw new Error("Este e-mail já esta em uso!");
    // }

    //// Arrumar o find-by-email no repository
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userClientRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  },
};
