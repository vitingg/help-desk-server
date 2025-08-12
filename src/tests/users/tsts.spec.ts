import request from "supertest";
import app from "@src/server";
import { prisma } from "@src/lib/prisma";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

// Describe the test suite for the Tech user endpoints
describe("Tech User API Endpoints", () => {
  let adminToken: string;
  let techToken: string;
  let adminId: number;
  let techId: number;

  const adminEmail = `test-admin-${Date.now()}@example.com`;
  const techEmail = `test-tech-${Date.now()}@example.com`;
  const techPassword = "techPassword123";

  // Before all tests, create an admin and a tech user, and generate their tokens
  beforeAll(async () => {
    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable not set!");
    }

    // Create an Admin User
    const admin = await prisma.user.create({
      data: {
        username: "Test Admin",
        email: adminEmail,
        password: "adminPassword", // In a real app, this should be hashed
        role: "ADMIN",
      },
    });
    adminId = admin.id;
    adminToken = jwt.sign({ userId: admin.id, role: "ADMIN" }, process.env.JWT_SECRET);

    // Create a Tech User (to be managed by the admin)
    const tech = await prisma.user.create({
      data: {
        username: "Initial Tech",
        email: techEmail,
        password: techPassword,
        role: "TECH",
      },
    });
    techId = tech.id;
    techToken = jwt.sign({ userId: tech.id, role: "TECH" }, process.env.JWT_SECRET);
  });

  // After all tests, clean up the created users
  afterAll(async () => {
    // Use deleteMany to be safe, in case IDs are lost
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [adminEmail, techEmail, `new-tech-${Date.now()}@example.com`],
        },
      },
    });
    await prisma.$disconnect();
  });

  // --- Test Suite for POST /techs ---
  describe("POST /techs", () => {
    it("should allow an ADMIN to create a new tech", async () => {
      const newTechEmail = `new-tech-${Date.now()}@example.com`;
      const response = await request(app)
        .post("/techs")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          username: "New Tech From Test",
          email: newTechEmail,
          password: "newTechPassword",
        });

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(newTechEmail);
      expect(response.body.role).toBe("TECH");

      // Clean up the newly created user
      await prisma.user.delete({ where: { id: response.body.id } });
    });

    it("should NOT allow a TECH to create a new tech", async () => {
      const response = await request(app)
        .post("/techs")
        .set("Authorization", `Bearer ${techToken}`) // Using tech token
        .send({
          username: "Another Tech",
          email: "another-tech@example.com",
          password: "aPassword",
        });

      expect(response.status).toBe(403); // Or 401, depending on your 'authorize' middleware
    });
  });

  // --- Test Suite for GET /techs ---
  describe("GET /techs", () => {
    it("should get a list of all tech users", async () => {
      const response = await request(app).get("/techs");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      // Check if our created tech is in the list
      const foundTech = response.body.find((user: any) => user.id === techId);
      expect(foundTech).toBeDefined();
      expect(foundTech.email).toBe(techEmail);
    });
  });

  // --- Test Suite for PUT /techs/:id ---
  describe("PUT /techs/:id", () => {
    it("should allow a TECH to update their own information (username and email)", async () => {
      const newUsername = "Updated Tech Name";
      const response = await request(app)
        .put(`/techs/${techId}`)
        .set("Authorization", `Bearer ${techToken}`)
        .field("username", newUsername) // Use .field for multipart/form-data
        .field("email", techEmail); // Email can remain the same

      expect(response.status).toBe(200);
      expect(response.body.username).toBe(newUsername);
    });

    it("should allow an ADMIN to update any tech's information", async () => {
      const adminUpdatedName = "Admin Updated This Tech";
      const response = await request(app)
        .put(`/techs/${techId}`)
        .set("Authorization", `Bearer ${adminToken}`) // Use admin token
        .field("username", adminUpdatedName)
        .field("email", techEmail);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe(adminUpdatedName);
    });

    it("should allow a user to update their profile picture", async () => {
        // Create a dummy file for upload
        const dummyImagePath = path.join(__dirname, 'test-image.png');
        fs.writeFileSync(dummyImagePath, 'dummy content');

        const response = await request(app)
            .put(`/techs/${techId}`)
            .set("Authorization", `Bearer ${techToken}`)
            .field("username", "Tech With Picture")
            .field("email", techEmail)
            .attach("profilePicture", dummyImagePath); // Attach the file

        expect(response.status).toBe(200);
        expect(response.body.profilePicture).not.toBeNull();
        expect(response.body.profilePicture).toContain("cloudinary"); // Check if the URL is from Cloudinary

        // Clean up the dummy file
        fs.unlinkSync(dummyImagePath);
    });
  });

  // --- Test Suite for DELETE /techs/:id ---
  describe("DELETE /techs/:id", () => {
    it("should NOT allow a TECH to delete another tech", async () => {
      const response = await request(app)
        .delete(`/techs/${techId}`)
        .set("Authorization", `Bearer ${techToken}`); // Using tech token

      expect(response.status).toBe(403); // Or 401
    });

    it("should allow an ADMIN to delete a tech", async () => {
      const response = await request(app)
        .delete(`/techs/${techId}`)
        .set("Authorization", `Bearer ${adminToken}`); // Using admin token

      expect(response.status).toBe(200);

      // Verify the user is actually deleted
      const findAttempt = await prisma.user.findUnique({
        where: { id: techId },
      });
      expect(findAttempt).toBeNull();
    });
  });
});
