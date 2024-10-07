import mongoose from "mongoose";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

import app from "../app";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB!);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("Getting list of all books", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/book");
    expect(res.statusCode).toBe(200);
  });
});

describe("Update a book stock number", () => {
  it("Should return the updated book", async () => {
    const res = await request(app).patch("/book/SHR-1").send({ stocks: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.payload.book_stocks).toBe(3);
  });
});

describe("Create a new book", () => {
  it("Should return the book document", async () => {
    const res = await request(app).post("/book/").send({
      book_id: uuidv4(),
      book_author: "Author1",
      book_title: "Title1",
      initial_stock: 1,
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("Getting list of all members", () => {
  it("should return all members", async () => {
    const res = await request(app).get("/member");
    expect(res.statusCode).toBe(200);
  });
});

describe("Create a new member", () => {
  it("Should return the member document", async () => {
    const res = await request(app).post("/member").send({
      member_id: uuidv4(),
      name: "Member1",
    });
    expect(res.statusCode).toBe(201);
  });
});

describe("Getting list of a specific member", () => {
  it("should return a member document", async () => {
    const res = await request(app).get("/member/M001");
    expect(res.statusCode).toBe(200);
  });
});

describe("Forgive member penalty due", () => {
  it("should return a success response", async () => {
    const res = await request(app).patch("/forgiveMember/M001");
    expect(res.statusCode).toBe(200);
  });
});

describe("Borrowing a book", () => {
  it("Should return the book document", async () => {
    const res = await request(app)
      .post("/borrowBook/M001")
      .send({
        books: ["SHR-1"],
      });
    expect(res.statusCode).toBe(200);
  });
});

describe("Returning a book", () => {
  it("Should return the book document", async () => {
    const res = await request(app)
      .post("/returnBook/M001")
      .send({
        books: ["SHR-1"],
      });
    expect(res.statusCode).toBe(200);
  });
});
