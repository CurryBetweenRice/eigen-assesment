"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.getAllBook = exports.updateBookStock = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const responseHelper_1 = __importDefault(require("../responseHelper"));
const updateBookStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { stocks } = req.body;
        if (!stocks) {
            return responseHelper_1.default.throwBadRequestError("Missing stocks parameter", res);
        }
        const bookDoc = yield book_model_1.default.findOne({ book_id: bookId });
        if (!bookDoc) {
            return responseHelper_1.default.throwNotFoundError("Could not fine the book, check the id", res);
        }
        const updateBookStockDoc = yield book_model_1.default.findOneAndUpdate({ book_id: bookId }, { book_stocks: stocks }, { new: true });
        if (!updateBookStockDoc) {
            return responseHelper_1.default.throwBadRequestError("Something went wrong when updating the book stock", res);
        }
        return responseHelper_1.default.returnOkResponse("Successfully update the book stock", res, updateBookStockDoc);
    }
    catch (e) {
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.updateBookStock = updateBookStock;
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookDoc = yield book_model_1.default.find();
        res.status(200).send({
            success: true,
            message: "Succesfully retrieve all book Docs",
            payload: allBookDoc,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Something went really wrong.");
    }
});
exports.getAllBook = getAllBook;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book_id, book_title, book_author, initial_stock } = req.body;
        if (!book_id || !book_title || !book_author || !initial_stock) {
            return responseHelper_1.default.throwBadRequestError("Missing one or more paramters", res);
        }
        const saveBookDoc = yield book_model_1.default.create({
            book_id,
            book_title,
            book_author,
            book_stocks: initial_stock,
        });
        if (!saveBookDoc) {
            return responseHelper_1.default.throwBadRequestError("SOmething went wrong when creating the book", res);
        }
        return responseHelper_1.default.returnCreatedResponse("New book created", saveBookDoc, res);
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.createBook = createBook;
