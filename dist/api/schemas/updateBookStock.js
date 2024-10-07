"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookStockRequest = exports.updateBookStock400Response = exports.updateBookStock500Response = exports.updateBookStock200Response = exports.updateBookStock = void 0;
const updateBookStock = {
    tags: ["Book"],
    summary: "",
    description: "",
    operationId: "updateBookStock200Response",
    parameters: [
        {
            name: "bookId",
            in: "path",
            description: "ID of the book",
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
                    $ref: "#/components/schemas/updateBookStockRequest",
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
                        $ref: "#/components/schemas/updateBookStock200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateBookStock500Response",
                    },
                },
            },
        },
        "400": {
            description: "Error 400 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateBookStock400Response",
                    },
                },
            },
        },
    },
};
exports.updateBookStock = updateBookStock;
const updateBookStockRequest = {
    description: "",
    type: "object",
    properties: {
        stocks: {
            type: "number",
            example: 10,
        },
    },
};
exports.updateBookStockRequest = updateBookStockRequest;
const updateBookStock200Response = {
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
            example: "Successfully update the book stock",
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
exports.updateBookStock200Response = updateBookStock200Response;
const updateBookStock400Response = {
    title: "updateBookStock400Response",
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
exports.updateBookStock400Response = updateBookStock400Response;
const updateBookStock500Response = {
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
exports.updateBookStock500Response = updateBookStock500Response;
