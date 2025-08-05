import request from "supertest";
import app from "@src/server";

it("should create a new client", async () => {
  const response = await request(app).post("/clients").send({
    username: "Teste client",
    email: "teste@gmail.com",
    password: "testees",
  });

  expect(response.status).toBe(201);
});
