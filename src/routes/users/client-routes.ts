import { validateUser } from "@src/middlewares/validate-user";
import { signUpSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  createClient,
  getClients,
  putClient,
  deleteClients,
} from "@controllers/users/client-controller";

/**
 * @openapi
 * /clients:
 * post:
 * tags:
 * - Client
 * summary: Cria um novo cliente
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - username
 * - email
 * - password
 * properties:
 * username:
 * type: string
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * responses:
 *   201:
 *     description: Usuário criado com sucesso
 *   400:
 *     description: Erro ao criar um usuário
 *   401:
 *     description: Não autorizado
 */
app.post("/clients", validateUser(signUpSchema), createClient);

/**
 * @openapi
 * /clients:
 * get:
 * tags:
 * - Client
 * summary: Lista todos os clientes
 * responses:
 * '200':
 * description: Lista de clientes retornada com sucesso
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * username:
 * type: string
 * email:
 * type: string
 * format: email
 * '401':
 * description: Não autorizado
 */
app.get("/clients", getClients);

/**
 * @openapi
 * /clients/{id}:
 * put:
 * tags:
 * - Client
 * summary: Atualizar um cliente por ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * format: email
 * password:
 * type: string
 * responses:
 * 200:
 * description: Cliente atualizado com sucesso
 * 404:
 * description: Cliente não encontrado
 * 401:
 * description: Não autorizado
 */
app.put("/clients/:id", putClient);

/**
 * @openapi
 * /clients/{id}:
 * delete:
 *  tags:
 * - Client
 * summary: Removendo um cliente pelo ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Cliente deletado com sucesso
 * 404:
 * description: Cliente não encontrado
 * 401:
 * description: Não autorizado
 */
app.delete("/clients/:id", deleteClients);

export default app;
