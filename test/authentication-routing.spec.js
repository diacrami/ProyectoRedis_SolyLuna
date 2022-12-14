const request = require("supertest");
const db = require("../db/models/index");
const { app } = require("../app");
const { serverRunning } = require("../bin/www");

const username = "willymateo";
const password = "dawm2022";

describe("Tests with CORRECT credentials", () => {
  describe("POST /login", () => {
    const credentials = {
      username,
      password,
    };

    test("Should respond with a 200 OK", async () => {
      const res = await request(app).post("/api/auth/login").send(credentials);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Success authentication");
      expect(res.body).toHaveProperty("token");
    });
  });
});

describe("Tests with INCORRECT data", () => {
  let credentials = [{}, { username }, { password }];

  credentials.forEach(credential => {
    describe("POST /login with incomplete params", () => {
      test("Should respond with a 400 Bad Request", async () => {
        const res = await request(app).post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          error:
            "Incomplete credentials. Should receive 'username' and 'password' params",
        });
      });
    });
  });

  credentials = [
    {
      username: null,
      password: null,
    },
    {
      username: NaN,
      password: NaN,
    },
  ];

  credentials.forEach(credential => {
    describe("POST /login with nulish params", () => {
      test("Should respond with a 400 Bad Request", async () => {
        const res = await request(app).post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
          error: "The params value can't be falsy values",
        });
      });
    });
  });

  credentials = [
    {
      username: "willymateox",
      password,
    },
    {
      username,
      password: "dawm2023",
    },
  ];

  credentials.forEach(credential => {
    describe("POST /login with incorrect credentials", () => {
      test("Should respond with a 401 Unauthorized", async () => {
        const res = await request(app).post("/api/auth/login").send(credential);

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({
          error: `Invalid user or password`,
        });
      });
    });
  });
});

afterAll(() => {
  db.sequelize.close();
  serverRunning.close();
});
