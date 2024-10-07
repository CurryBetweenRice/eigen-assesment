"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBook500Response = exports.getAllBook200Response = exports.getAllBook = void 0;
const getAllBook = {
    tags: ["Book"],
    summary: "",
    description: "",
    operationId: "getAllBook200Response",
    responses: {
        "200": {
            description: "Success 200 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getAllBook200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/getAllBook500Response",
                    },
                },
            },
        },
    },
};
exports.getAllBook = getAllBook;
const getAllBook200Response = {
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
            example: "Successfully retrieve all books",
        },
        payload: {
            type: "array",
            items: {
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
    },
};
exports.getAllBook200Response = getAllBook200Response;
const getAllBook500Response = {
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
exports.getAllBook500Response = getAllBook500Response;
