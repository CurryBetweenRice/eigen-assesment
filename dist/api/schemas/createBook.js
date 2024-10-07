"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookRequest = exports.createBook400Response = exports.createBook500Response = exports.createBook200Response = exports.createBook = void 0;
const createBook = {
    tags: ["Book"],
    summary: "",
    description: "",
    operationId: "createBook200Response",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/createBookRequest",
                },
            },
        },
        required: true,
    },
    responses: {
        "200": {
            description: "Success 200 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createBook200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createBook500Response",
                    },
                },
            },
        },
        "400": {
            description: "Error 400 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/createBook400Response",
                    },
                },
            },
        },
    },
};
exports.createBook = createBook;
const createBookRequest = {
    description: "",
    type: "object",
    properties: {
        book_id: {
            type: "string",
            example: "JK-45",
        },
        book_title: {
            type: "string",
            example: "Harry Potter",
        },
        book_author: {
            type: "string",
            example: "J.K. Rowling",
        },
        book_stocks: {
            type: "number",
            example: "1",
        },
    },
};
exports.createBookRequest = createBookRequest;
const createBook200Response = {
    description: "",
    type: "object",
    properties: {
        success: {
            description: "Indicator for a successful request. Always true for 200 Response.",
            type: "boolean",
            example: true,
        },
        msg: {
            description: "Success message of the request",
            type: "string",
            example: "Successfully create a new book",
        },
        payload: {
            type: "object",
            properties: {
                book_id: {
                    type: "string",
                    example: "JK-45",
                },
                book_title: {
                    type: "string",
                    example: "Harry Potter",
                },
                book_author: {
                    type: "string",
                    example: "J.K. Rowling",
                },
                book_stocks: {
                    type: "number",
                    example: "1",
                },
            },
        },
    },
};
exports.createBook200Response = createBook200Response;
const createBook400Response = {
    title: "createBook400Response",
    description: "error response for 400 Errors",
    type: "object",
    properties: {
        success: {
            description: "A boolean value to indicate if the API was successful/unsuccessful. Is always false for error response",
            type: "boolean",
            example: "false",
        },
        msg: {
            description: "The message sent given with the response.",
            type: "string",
            example: "One or more missing parameter",
        },
        err: {
            description: "The error description.",
            type: "string",
        },
    },
};
exports.createBook400Response = createBook400Response;
const createBook500Response = {
    title: "changeUserRole500Response",
    description: "error response for 500 Errors",
    type: "object",
    properties: {
        success: {
            description: "A boolean value to indicate if the API was successful/unsuccessful. Is always false for error response",
            type: "boolean",
            example: "false",
        },
        msg: {
            description: "The message sent given with the response.",
            type: "string",
            example: "Something went wrong",
        },
        err: {
            description: "The error description.",
            type: "string",
        },
    },
};
exports.createBook500Response = createBook500Response;
