import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Help-desk",
      version: "1.0.0",
      description:
        "Documentação da API do help-desk, site focado a atendimento e resolução de problemas.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        }
      },
      schemas: {
        Client: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único do cliente.",
              example: 10,
            },
            username: {
              type: "string",
              description: "Nome de usuário do cliente.",
              example: "Victor Gabriel",
            },
            email: {
              type: "string",
              description: "E-mail do cliente.",
              example: "victor@example.com",
            },
          },
        },
        Tech: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "O ID único do técnico.",
              example: 10,
            },
            username: {
              type: "string",
              description: "Nome de usuário do técnico.",
              example: "José Ronaldo",
            },
            email: {
              type: "string",
              description: "E-mail do cliente.",
              example: "jose@example.com",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
