import { validateUser } from "@src/middlewares/validate-user";
import { signInSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  signInController,
  signOutController,
  getCurrentUser,
} from "@controllers/users/auth-controller";
import { authorize } from "@src/middlewares/authorize";

/**
 * @openapi
 * /sign-in:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Realiza o login e retorna um token de acesso
 *     description: Endpoint público para autenticar um usuário com e-mail e senha.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: 'usuario@email.com'
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 'senha123'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI
 *       '400':
 *         description: Requisição inválida
 *       '401':
 *         description: Não autorizado (credenciais incorretas).
 */
app.post("/sign-in", validateUser(signInSchema), signInController);

app.post("/sign-out", signOutController);

app.get("/me", authorize(), getCurrentUser);

export default app;
