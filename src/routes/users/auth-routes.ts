import { validateUser } from "@src/middlewares/validate-user";
import { signInSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  signInController,
  signOutController,
  getAdmins,
} from "@controllers/users/auth-controller";

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

/**
 * @openapi
 * /sign-in:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Lista todos os admins
 *     responses:
 *       200:
 *         description: Admins retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
app.get("/sign-in", getAdmins);

export default app;
