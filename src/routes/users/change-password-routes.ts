import { app } from "@src/lib/app-express";
import { changePasswordController } from "@src/controller/users/change-password-controller";
import { authorize } from "@src/middlewares/authorize";

/**
 * @openapi
 * /change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Altera a senha do usuário autenticado
 *     description: Permite que um usuário logado altere sua senha, informando a senha atual e a nova senha.
 *     security:
 *       - bearerAuth: []   # <- assume que você já definiu o esquema de segurança bearerAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: 'senhaAntiga123'
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: 'senhaNova456'
 *     responses:
 *       '200':
 *         description: Senha alterada com sucesso.
 *       '400':
 *         description: Requisição inválida (ex: campos faltando).
 *       '401':
 *         description: Não autorizado (token inválido ou não fornecido).
 *       '403':
 *         description: Proibido (usuário não tem permissão).
 */
app.post(
  "/change-password",
  authorize(["CLIENT", "TECH"]),
  changePasswordController
);

// Implementar: corrigir isso ai

export default app;
