import { userRepository } from "../repository/user-repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export interface CreateUserInput {
  username?: string;
  email: string;
  password: string;
}

export interface CreateTechUserInput {
  username?: string;
  email: string;
  password: string;
  workHours: string[];
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

  createTechUser: async ({
    username,
    email,
    password,
    workHours,
  }: CreateTechUserInput) => {
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
      workHours: {
        create: {
          workTime: workHours,
        },
      },
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
      user,
    };
  },

  changePassword: async ({ oldPassword, newPassword, userId }) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      userId.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Password incorrect!");
    }

    const newDatabasePassword = await bcrypt.hash(newPassword, 10);
    await userRepository.changePassword(userId, newDatabasePassword);
  },
};
