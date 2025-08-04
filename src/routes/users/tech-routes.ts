import { createTech, getTechs } from "@controllers/users/tech-controller";
import { authorize } from "@src/middlewares/authorize";
import { app } from "@src/lib/app-express";

/**
 * @openapi
 * /tech:
 *   post:
 *     tags:
 *       - Tech
 *     summary: Cria um novo técnico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Técnico criado com sucesso
 *       400:
 *         description: Erro ao criar um técnico
 *       401:
 *         description: Não autorizado
 */
app.post("/tech", authorize(["ADMIN"]), createTech);

/**
 * @openapi
 * /techs:
 *   get:
 *     tags:
 *       - Tech
 *     summary: Lista todos os técnicos
 *     responses:
 *       200:
 *         description: Técnicos retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
app.get("/techs", getTechs);

export default app;
