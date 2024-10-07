import * as getAllBookImport from "./schemas/getAllBook";
import * as borrowBookImport from "./schemas/borrowBook";
import * as createMemberImport from "./schemas/createMember";
import * as forgiveMemberImport from "./schemas/forgiveMember";
import * as getAllMemberImport from "./schemas/getAllMember";
import * as getMemberImport from "./schemas/getMember";
import * as returnBookImport from "./schemas/returnBook";
import * as updateBookStockimport from "./schemas/updateBookStock";
import * as createBookImport from "./schemas/createBook";

const allSchemas = Object.assign(
  {},
  getAllBookImport,
  borrowBookImport,
  createMemberImport,
  forgiveMemberImport,
  getMemberImport,
  getAllMemberImport,
  returnBookImport,
  updateBookStockimport,
  createBookImport
);

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

export { apiDocumentation };
