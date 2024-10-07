const getAllMembers = {
  tags: ["Member"],
  summary: "",
  description: "",
  operationId: "getAllMembers200Response",
  responses: {
    "200": {
      description: "Success 200 Response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/getAllMembers200Response",
          },
        },
      },
    },
    "500": {
      description: "Error 500 Response",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/getAllMembers500Response",
          },
        },
      },
    },
  },
};

const getAllMembers200Response = {
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
      example: "Successfully retrieve all member",
    },
    payload: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Anggi",
          },
          number_of_borrowed_book: {
            type: "string",
            example: "1",
          },
        },
      },
    },
  },
};

const getAllMembers500Response = {
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

export { getAllMembers, getAllMembers200Response, getAllMembers500Response };
