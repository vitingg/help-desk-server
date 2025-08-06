import request from "supertest";
import app from "@src/server";

describe("category tests", () => {
  let categoryId: number;
  it("should create a new category", async () => {
    const response = await request(app).post("/category").send({
      name: "Teste category",
      basePrice: 100,
    });

    expect(response.status).toBe(201);
    categoryId = await response.body.id;
  });
  it("should delete the category", async () => {
    const response = request(app).delete(`/category/${categoryId}`);
    expect((await response).status).toBe(200);
  });
});
