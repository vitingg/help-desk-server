import { userClientRepository } from "../repository/user-client-repository";

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const userClientService = {
  createUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await userClientRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Este e-mail já esta em uso!");
    }
    // Criptografar a senha aqui!

    const newUser = await userClientRepository.create({
      username,
      email,
      password, // aqui entraria a senha criptografada do cliente
    });

    return newUser;
  },
};
