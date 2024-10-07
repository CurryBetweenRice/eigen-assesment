import { Response } from "express";
import { statusCode } from "./statusCode";

/**
 * Returning error with spesific http code error
 *
 * @param {Number} code HTTP status code for the error
 * @returns {(message: String, res: Response) => void}
 */
const throwErrorResponse = (code: number) => (msg: string, res: Response) => {
  res.status(code).send({
    success: false,
    msg: msg,
  });
};

/**
 * Return Internal Error preset with message
 * @param {String} msg Message of the error
 * @param {import('express').Response}res
 * @param {any} err
 */
const throwInternalError = (msg: string, res: Response, err: any) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).send({
    success: false,
    err: err,
    msg: msg,
  });
};

/**
 * Return Unexpected Error preset with message
 * @param {String} msg Message of the error
 * @param {import('express').Response} res
 */
const throwUnexpectedError = (msg: string, res: Response) => {
  res.status(statusCode.BAD_REQUEST).send({
    success: false,
    msg: msg,
  });
};

/**
 * Return error connection for the database
 * @param {import('express').Response} res
 */
const throwConnectionError = (res: Response) => {
  res.status(statusCode.INTERNAL_SERVER_ERROR).send({
    success: false,
    msg: "Connection can't established. Please try again later",
  });
};

/**
 * Return Created Response Preset with created document as payload
 * @param {String} model The model name of the created document
 * @param {any} payload Payload of the document after created
 * @param {import('express').Response} res
 */
const returnCreatedResponse = (model: string, payload: any, res: Response) => {
  res.status(statusCode.CREATED).send({
    success: true,
    msg: `${model} successfully created!`,
    payload,
  });
};

/**
 * Return OK Response Preset with payload optionally
 * @param {String} msg Success message for the response
 * @param {import('express').Response} res
 * @param {any} payload Payload for the response (Optional)
 */
const returnOkResponse = (msg: string, res: Response, payload?: any) => {
  res.status(statusCode.OK).send({
    success: true,
    msg,
    payload,
  });
};

export default {
  /**
   * Bad Request with 400 Code
   * @param {String} msg Failed message for the response
   * @param {import('express').Response} res
   */
  throwBadRequestError: throwErrorResponse(statusCode.BAD_REQUEST),
  /**
   * Bad Request with 401 Code
   * @param {String} msg Failed message for the response
   * @param {import('express').Response} res
   */
  throwUnauthorizedError: throwErrorResponse(statusCode.UNAUTHORIZED),
  /**
   * Bad Request with 403 Code
   * @param {String} msg Failed message for the response
   * @param {import('express').Response} res
   */
  throwForbiddenError: throwErrorResponse(statusCode.FORBIDDEN),
  /**
   * Bad Request with 404 Code
   * @param {String} msg Failed message for the response
   * @param {import('express').Response} res
   */
  throwNotFoundError: throwErrorResponse(statusCode.NOT_FOUND),
  throwUnexpectedError,
  throwInternalError,
  throwConnectionError,
  returnCreatedResponse,
  returnOkResponse,
};
