"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = 3000;
const openapi_1 = require("./api/openapi");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.default)();
const routes_1 = require("./routes");
app.use("/documentation", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_1.apiDocumentation));
app.use("/", routes_1.appRouter);
exports.default = app;
