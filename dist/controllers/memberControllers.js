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
exports.forgiveMember = exports.getMember = exports.getAllMembers = exports.createMember = void 0;
const member_model_1 = __importDefault(require("../models/member.model"));
const rent_model_1 = __importDefault(require("../models/rent.model"));
const responseHelper_1 = __importDefault(require("../responseHelper"));
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { member_id, name } = req.body;
        if (!member_id || !name) {
            return responseHelper_1.default.throwBadRequestError("Missing one or more parameters", res);
        }
        const newMemberDoc = yield member_model_1.default.create({
            member_id,
            name,
        });
        if (!newMemberDoc) {
            return responseHelper_1.default.throwNotFoundError("Could not find the member, check the id again", res);
        }
        return responseHelper_1.default.returnCreatedResponse("Created a new member", newMemberDoc, res);
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.createMember = createMember;
const getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const memberDocs = yield member_model_1.default.find();
        const payload = [];
        for (const member of memberDocs) {
            const numberOfBook = yield rent_model_1.default.countDocuments({
                member_id: member.member_id,
                status: "Borrowed",
            });
            payload.push({
                name: member.name,
                number_of_borrowed_book: numberOfBook,
            });
        }
        res.status(200).send({
            success: true,
            message: "Successfully retrieve all members",
            payload,
        });
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.getAllMembers = getAllMembers;
const getMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const checkMemberDoc = yield member_model_1.default.findOne({ member_id: memberId });
        if (!checkMemberDoc) {
            return responseHelper_1.default.throwNotFoundError("Could not find the member, check the id again", res);
        }
        const number_of_borrowed_book = yield rent_model_1.default.countDocuments({
            member_id: memberId,
            status: "Borrowed",
        });
        const payload = {
            member_name: checkMemberDoc.name,
            borrowed_book: number_of_borrowed_book,
        };
        return responseHelper_1.default.returnOkResponse("Successfully retrieve the membert", res, payload);
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.getMember = getMember;
const forgiveMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const checkMemberDoc = yield member_model_1.default.findOne({ member_id: memberId });
        if (!checkMemberDoc) {
            return responseHelper_1.default.throwNotFoundError("Could not find the member, check the id again", res);
        }
        const updateMember = yield member_model_1.default.findOneAndUpdate({ member_id: memberId }, {
            $unset: { penalty_due: "" },
        }, { new: true });
        return responseHelper_1.default.returnOkResponse("Successfully forgive the member", res);
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.forgiveMember = forgiveMember;
