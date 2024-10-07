"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RentSchema = new mongoose_1.Schema({
    member_id: {
        type: String,
    },
    book_id: {
        type: String,
    },
    rent_due: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["Borrowed", "Returned"],
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
const RentModel = (0, mongoose_1.model)("Rent", RentSchema);
exports.default = RentModel;
