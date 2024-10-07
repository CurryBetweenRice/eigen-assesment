const createMmeber = {
  tags: ["Member"],
  summary: "",
  description: "",
  operationId: "createMmeber200Response",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createMmeberRequest",
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
            $ref: "#/components/schemas/createMmeber200Response",
          },
        },
      },
    },
    "500": {
      description: "Error 500 Response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createMmeber500Response",
          },
        },
      },
    },
    "400": {
      description: "Error 400 Response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createMmeber400Response",
          },
        },
      },
    },
  },
};

const createMmeberRequest = {
  description: "",
  type: "object",
  properties: {
    member_id: {
      type: "string",
      example: "M001",
    },
    name: {
      type: "string",
      example: "Angga",
    },
  },
};

const createMmeber200Response = {
  description: "",
  type: "object",
  properties: {
    success: {
      description:
        "Indicator for a successful request. Always true for 200 Response.",
      type: "boolean",
      example: true,
    },
    msg: {
      description: "Success message of the request",
      type: "string",
      example: "Created a new member",
    },
    payload: {
      type: "object",
      properties: {
        member_id: {
          type: "string",
          example: "M001",
        },
        name: {
          type: "string",
          example: "Angga",
        },
      },
    },
  },
};

const createMmeber400Response = {
  title: "createMmeber400Response",
  description: "error response for 400 Errors",
  type: "object",
  properties: {
    success: {
      description:
        "A boolean value to indicate if the API was successful/unsuccessful. Is always false for error response",
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

const createMmeber500Response = {
  title: "changeUserRole500Response",
  description: "error response for 500 Errors",
  type: "object",
  properties: {
    success: {
      description:
        "A boolean value to indicate if the API was successful/unsuccessful. Is always false for error response",
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

export {
  createMmeber,
  createMmeber200Response,
  createMmeber500Response,
  createMmeber400Response,
  createMmeberRequest,
};
