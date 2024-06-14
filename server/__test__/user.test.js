const request = require("supertest");
const app = require("../app.js");
const { User } = require("../models");
const { signToken } = require("../helpers/jwt_token.js");

const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt.js");
const { queryInterface } = sequelize;

const user = {
  username: "john",
  email: "john@example.com",
  password: "admin",
};

const user1 = {
  username: "testing",
  email: "testing@example.com",
  password: "staff",
};

let token_user;
console.log(token_user);

describe("Users", () => {
  describe("POST /register", () => {
    describe("Success", () => {
      test("Register first", async () => {
        let { body, status } = await request(app).post("/register").send({
          username: "Testing User",
          email: "Testing@gmail.com",
          password: "Testing",
        });

        // console.log(body);
        expect(status).toBe(201);
      });
    });
  });

  describe("Failed", () => {
    test("Password is required", async () => {
      let { body, status } = await request(app).post("/register").send({
        username: "Testing User",
        email: "Testing@gmail.com",
        password: "",
      });

      expect(status).toBe(400);
    });

    test("Username is Required", async () => {
      let { body, status } = await request(app).post("/register").send({
        username: "",
        email: "Testing@gmail.com",
        password: "Testing",
      });

      expect(status).toBe(400);
    });

    test("Password should be more than 5 character", async () => {
      let { body, status } = await request(app).post("/register").send({
        email: "john@example.com",
        password: "admi",
      });

      expect(status).toBe(400);
    });

    test("Email is Required", async () => {
      let { body, status } = await request(app).post("/register").send({
        username: "Testing User",
        email: "",
        password: "Testing",
      });

      expect(status).toBe(400);
    });
  });
});

describe("Users", () => {
  describe("POST /login", () => {
    describe("Success", () => {
      test("Login should be return access_token first", async () => {
        let { body, status } = await request(app).post("/login").send(user1);

        // console.log(body);
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
      });
    });
  });

  describe("Failed", () => {
    test("Email should be return error when email is empty", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "",
        password: "admin",
      });

      expect(status).toBe(400);
    });

    test("Password should be return error when email is empty", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "john@example.com",
        password: "",
      });

      expect(status).toBe(400);
    });

    test("Email should be return error when email is wrong", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "baba@example.com",
        password: "admin",
      });

      expect(status).toBe(401);
    });

    test("Password should be return error when pasword is wrong", async () => {
      let { body, status } = await request(app).post("/login").send({
        email: "john@example.com",
        password: "staff",
      });

      expect(status).toBe(401);
    });
  });
});

describe("Users", () => {
  describe("GET /user", () => {
    describe("Success", () => {
      test("Login should be return access_token first", async () => {
        let { body, status } = await request(app)
          .get("/user")
          .set("Authorization", "Bearer " + token_user);

        console.log(body);
        expect(status).toBe(200);
      });
    });
  });
});

beforeAll(async () => {
  let user = await User.create(user1);
  token_user = signToken({ id: user.id });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
