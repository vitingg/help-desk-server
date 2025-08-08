import request from "supertest";
import app from "@src/server";

describe("tech tests", () => {
  let token: string;
  let createdTechId: number;


  beforeAll(async () => {
    const login = await request(app).post("/sign-in").send({
      email: "Admin@gmail.com",
      password: "AdminPassword",
    });

    token = login.body.token;
  });

  it("should create a new tech", async () => {
    const response = await request(app)
      .post("/techs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "Test tech",
        email: "testtech@gmail.com",
        password: "testtech",
        role: "TECH",
      });

    expect(response.status).toBe(201);
    createdTechId = await response.body.id;
  });

  it("should delete the tech", async () => {
    const response = request(app)
      .delete(`/techs/${createdTechId}`)
      .set("Authorization", `Bearer ${token}`);

    expect((await response).status).toBe(200);
  });
});
