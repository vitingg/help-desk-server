import request from "supertest";
import app from "@src/server";

describe("should sign-in", () => {
  it("sign-in route", async () => {
    const login = await request(app).post("/sign-in").send({
      email: "Admin@gmail.com",
      password: "AdminPassword",
    });
    expect(login.status).toBe(200);
  });
});
