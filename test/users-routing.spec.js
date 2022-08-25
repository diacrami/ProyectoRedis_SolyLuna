const request = require("supertest");
const db = require("../db/models/index");
const { app } = require("../app");
const { serverRunning } = require("../bin/www");

describe("Tests with CORRECT data", () => {
  describe("GET /usuarios", () => {
    test("Should respond with a 200 OK", async () => {
      const res = await request(app)
        .get("/api/usuarios")
        .set(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUwODA4ODJjLTA2YTUtNDU5OS05ZmIyLTNkMDhkODliZDFiNiIsInVzZXJuYW1lIjoid2lsbHltYXRlbyIsImVtYWlsIjoid2ptYXRlb0Blc3BvbC5lZHUuZWMiLCJpYXQiOjE2NDc4MzE1Nzd9.W2QTldyahNcwh5yGn7-iY_S7clfdBZYWdzem8PO1yKk"
        )
        .send();

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

afterAll(() => {
  db.sequelize.close();
  serverRunning.close();
});
