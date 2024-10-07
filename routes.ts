import express from "express";

import {
  createBook,
  updateBookStock,
  getAllBook,
} from "./controllers/bookControllers";
import {
  getMember,
  createMember,
  getAllMembers,
  forgiveMember,
} from "./controllers/memberControllers";
import { borrowBook, returnBook } from "./controllers/rentControllers";

const app = express();

app.get("/book", getAllBook);

app.patch("/book/:bookId", updateBookStock);

app.post("/book", createBook);

app.get("/member", getAllMembers);

app.get("/member/:memberId", getMember);

app.post("/member", createMember);

app.patch("/forgiveMember/:memberId", forgiveMember);

app.post("/borrowBook/:memberId", borrowBook);

app.post("/returnBook/:memberId", returnBook);

export { app as appRouter };
