import z from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(4, { message: "O nome deverá ter no mínimo 4 caracteres" })
    .nonempty("O nome é obrigatório")
    .transform((username) => {
      return username
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z.email().min(5).nonempty("O email é obrigatório"),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .nonempty("A senha é obrigatória"),
});
