"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MemberSchema = new mongoose_1.Schema({
    member_id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    penalty_due: {
        type: Date,
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
const MemberModel = (0, mongoose_1.model)("Member", MemberSchema);
exports.default = MemberModel;
