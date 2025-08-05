import request from "supertest";
import app from "@src/server";

it("should create a new service", async () => {
  const response = await request(app).post("/service").send({
    title: "Teste service",
    description: "descrição teste",
    categoryId: 1,
    clientId: 2,
    techId: 3,
  });

  expect(response.status).toBe(201);
});
