"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    book_id: {
        type: String,
        unique: true,
    },
    book_title: {
        type: String,
    },
    book_author: {
        type: String,
    },
    book_stocks: {
        type: Number,
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
const BookModel = (0, mongoose_1.model)("Book", BookSchema);
exports.default = BookModel;
