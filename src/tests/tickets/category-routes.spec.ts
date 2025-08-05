import request from "supertest";
import express from "express";
import app from "@src/server";

it("should create a new category", async () => {
  const response = await request(app).post("/category").send({
    name: "Teste category",
    basePrice: 100,
  });

  expect(response.status).toBe(201);
});
