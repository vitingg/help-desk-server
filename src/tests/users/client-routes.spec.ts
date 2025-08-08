import request from "supertest";
import app from "@src/server";

describe("client tests", () => {
  let createdClientId: string;
  it("should create a new client", async () => {
    const response = await request(app).post("/clients").send({
      username: "Test client",
      email: "testclient@gmail.com",
      password: "testclient",
    });

    expect(response.status).toBe(201);
    createdClientId = await response.body.id;
  });

  it("should delete the client", async () => {
    const response = request(app).delete(`/clients/${createdClientId}`);
    expect((await response).status).toBe(200);
  });
});
