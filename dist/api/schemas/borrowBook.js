"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookRequest = exports.borrowBook400Response = exports.borrowBook500Response = exports.borrowBook200Response = exports.borrowBook = void 0;
const borrowBook = {
    tags: ["Rent"],
    summary: "",
    description: "",
    operationId: "borrowBook200Response",
    parameters: [
        {
            name: "memberId",
            in: "path",
            description: "ID of the member",
            required: true,
            schema: {
                type: "string",
            },
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/borrowBookRequest",
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
                        $ref: "#/components/schemas/borrowBook200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/borrowBook500Response",
                    },
                },
            },
        },
        "400": {
            description: "Error 400 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/borrowBook400Response",
                    },
                },
            },
        },
    },
};
exports.borrowBook = borrowBook;
const borrowBookRequest = {
    description: "",
    type: "object",
    properties: {
        books: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
};
exports.borrowBookRequest = borrowBookRequest;
const borrowBook200Response = {
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
            example: "Successfully borrowed the book listed below",
        },
        payload: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
};
exports.borrowBook200Response = borrowBook200Response;
const borrowBook400Response = {
    title: "borrowBook400Response",
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
exports.borrowBook400Response = borrowBook400Response;
const borrowBook500Response = {
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
exports.borrowBook500Response = borrowBook500Response;
