"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookRequest = exports.returnBook400Response = exports.returnBook500Response = exports.returnBook200Response = exports.returnBook = void 0;
const returnBook = {
    tags: ["Rent"],
    summary: "",
    description: "",
    operationId: "returnBook200Response",
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
                    $ref: "#/components/schemas/returnBookRequest",
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
                        $ref: "#/components/schemas/returnBook200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/returnBook500Response",
                    },
                },
            },
        },
        "400": {
            description: "Error 400 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/returnBook400Response",
                    },
                },
            },
        },
    },
};
exports.returnBook = returnBook;
const returnBookRequest = {
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
exports.returnBookRequest = returnBookRequest;
const returnBook200Response = {
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
            example: "Successfully return all the books",
        },
        payload: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
};
exports.returnBook200Response = returnBook200Response;
const returnBook400Response = {
    title: "returnBook400Response",
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
exports.returnBook400Response = returnBook400Response;
const returnBook500Response = {
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
exports.returnBook500Response = returnBook500Response;
