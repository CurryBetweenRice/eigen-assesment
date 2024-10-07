import express from "express";
import swaggerUi from "swagger-ui-express";

import connectToDatabase from "./database";

const app = express();
const port = 3000;

import { apiDocumentation } from "./api/openapi";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

import { appRouter } from "./routes";

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("/", appRouter);

export default app;
