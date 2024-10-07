"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgiveMember500Response = exports.forgiveMember200Response = exports.forgiveMember = void 0;
const forgiveMember = {
    tags: ["Member"],
    summary: "",
    description: "",
    operationId: "forgiveMember200Response",
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
    responses: {
        "200": {
            description: "Success 200 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/forgiveMember200Response",
                    },
                },
            },
        },
        "500": {
            description: "Error 500 Response",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/forgiveMember500Response",
                    },
                },
            },
        },
    },
};
exports.forgiveMember = forgiveMember;
const forgiveMember200Response = {
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
            example: "Successfully forgive the member",
        },
    },
};
exports.forgiveMember200Response = forgiveMember200Response;
const forgiveMember500Response = {
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
exports.forgiveMember500Response = forgiveMember500Response;
