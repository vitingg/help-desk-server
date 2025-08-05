import { app } from "@src/lib/app-express";
import {
  createCategories,
  getCategories,
  clientGetCategories,
  putToggleActivities,
  putChangeNameOrPrice,
} from "@src/controllers/tickets/category-controller";

/**
 * @openapi
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Cria uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - basePrice
 *             properties:
 *               name:
 *                 type: string
 *               basePrice:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro ao criar uma categoria
 *       401:
 *         description: Não autorizado
 */
app.post("/category", createCategories);

/**
 * @openapi
 * /all-categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
app.get("/all-categories", getCategories);

/**
 * @openapi
 * /available-categories:
 *   get:
 *     summary: Lista todas as categorias disponíveis (true)
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
app.get("/available-categories", clientGetCategories);

/**
 * @openapi
 * /category/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Atualizar um status da categoria
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
app.put("/category/:id", putToggleActivities);

/**
 * @openapi
 * /category/change-parameters/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Atualizar uma categoria por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               basePrice:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */
app.put("/category/change-parameters/:id", putChangeNameOrPrice);

export default app;
