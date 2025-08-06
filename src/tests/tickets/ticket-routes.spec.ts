import request from "supertest";
import app from "@src/server";

describe("tickets tests", () => {
  let serviceId: number;
  it("should create a new service", async () => {
    const response = await request(app).post("/service").send({
      title: "Teste service",
      description: "descrição teste",
      categoryId: 1,
      clientId: 2,
      techId: 3,
    });

    expect(response.status).toBe(201);
    serviceId = await response.body.service.id;
    console.log(serviceId);
  });

  describe("tickets tests", () => {
    let serviceId: number;
    it("should create a new service", async () => {
      const response = await request(app).post("/service").send({
        title: "Teste service",
        description: "descrição teste",
        categoryId: 1,
        clientId: 2,
        techId: 3,
      });

      expect(response.status).toBe(201);
      serviceId = await response.body.id;
      console.log(serviceId);
    });
  });
  it("should delete the service", async () => {
    const response = request(app).delete(`/service/${serviceId}`);

    expect((await response).status).toBe(200);
  });
});
