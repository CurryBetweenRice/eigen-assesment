"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const getAllBookImport = __importStar(require("./schemas/getAllBook"));
const borrowBookImport = __importStar(require("./schemas/borrowBook"));
const createMemberImport = __importStar(require("./schemas/createMember"));
const forgiveMemberImport = __importStar(require("./schemas/forgiveMember"));
const getAllMemberImport = __importStar(require("./schemas/getAllMember"));
const getMemberImport = __importStar(require("./schemas/getMember"));
const returnBookImport = __importStar(require("./schemas/returnBook"));
const updateBookStockimport = __importStar(require("./schemas/updateBookStock"));
const createBookImport = __importStar(require("./schemas/createBook"));
const allSchemas = Object.assign({}, getAllBookImport, borrowBookImport, createMemberImport, forgiveMemberImport, getMemberImport, getAllMemberImport, returnBookImport, updateBookStockimport, createBookImport);
const apiDocumentation = {
    openapi: "3.0.1",
    info: {
        version: "1.0.0",
        title: "Eigen Assesment API",
    },
    servers: [
        {
            url: "http://localhost:4500/",
            description: "Local Server",
        },
    ],
    tags: [
        {
            name: "Book",
        },
        {
            name: "Rent",
        },
        {
            name: "Member",
        },
    ],
    paths: {
        "/book": {
            get: getAllBookImport.getAllBook,
            post: createBookImport.createBook,
        },
        "/book/:bookId": {
            patch: updateBookStockimport.updateBookStock,
        },
        "/member": {
            get: getAllMemberImport.getAllMembers,
            post: createMemberImport.createMmeber,
        },
        "/member/:memberId": {
            get: getMemberImport.getMember,
        },
        "/borrowBook/:memberId": {
            post: borrowBookImport.borrowBook,
        },
        "/returnBook/:memberId": {
            post: returnBookImport.returnBook,
        },
        "/forgiveMember/:memberId": {
            patch: forgiveMemberImport.forgiveMember,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: allSchemas,
    },
};
exports.apiDocumentation = apiDocumentation;
