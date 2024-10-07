"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = require("./statusCode");
/**
 * Returning error with spesific http code error
 *
 * @param {Number} code HTTP status code for the error
 * @returns {(message: String, res: Response) => void}
 */
const throwErrorResponse = (code) => (msg, res) => {
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
const throwInternalError = (msg, res, err) => {
    res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).send({
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
const throwUnexpectedError = (msg, res) => {
    res.status(statusCode_1.statusCode.BAD_REQUEST).send({
        success: false,
        msg: msg,
    });
};
/**
 * Return error connection for the database
 * @param {import('express').Response} res
 */
const throwConnectionError = (res) => {
    res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).send({
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
const returnCreatedResponse = (model, payload, res) => {
    res.status(statusCode_1.statusCode.CREATED).send({
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
const returnOkResponse = (msg, res, payload) => {
    res.status(statusCode_1.statusCode.OK).send({
        success: true,
        msg,
        payload,
    });
};
exports.default = {
    /**
     * Bad Request with 400 Code
     * @param {String} msg Failed message for the response
     * @param {import('express').Response} res
     */
    throwBadRequestError: throwErrorResponse(statusCode_1.statusCode.BAD_REQUEST),
    /**
     * Bad Request with 401 Code
     * @param {String} msg Failed message for the response
     * @param {import('express').Response} res
     */
    throwUnauthorizedError: throwErrorResponse(statusCode_1.statusCode.UNAUTHORIZED),
    /**
     * Bad Request with 403 Code
     * @param {String} msg Failed message for the response
     * @param {import('express').Response} res
     */
    throwForbiddenError: throwErrorResponse(statusCode_1.statusCode.FORBIDDEN),
    /**
     * Bad Request with 404 Code
     * @param {String} msg Failed message for the response
     * @param {import('express').Response} res
     */
    throwNotFoundError: throwErrorResponse(statusCode_1.statusCode.NOT_FOUND),
    throwUnexpectedError,
    throwInternalError,
    throwConnectionError,
    returnCreatedResponse,
    returnOkResponse,
};
