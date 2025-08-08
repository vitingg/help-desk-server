import request from "supertest";
import app from "@src/server";

describe("category tests", () => {
  let categoryId: number;

  beforeAll(async () => {
    const response = await request(app).get("/all-categories");
    const alreadyExists = await response.body.find(
      (cat: any) => cat.name === "Test category"
    );

    if (alreadyExists) {
      throw new Error("Already exists one category with this name");
    }
  });

  it("should create a new category", async () => {
    const response = await request(app).post("/category").send({
      name: "Test category",
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
