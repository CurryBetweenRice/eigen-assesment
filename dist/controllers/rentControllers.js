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
exports.returnBook = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const rent_model_1 = __importDefault(require("../models/rent.model"));
const member_model_1 = __importDefault(require("../models/member.model"));
const responseHelper_1 = __importDefault(require("../responseHelper"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const { books } = req.body;
        const checkMemberDoc = yield member_model_1.default.findOne({ member_id: memberId });
        if (!checkMemberDoc) {
            return responseHelper_1.default.throwNotFoundError("This member id does not exist", res);
        }
        let borrowedBookList = [];
        if (!books) {
            return responseHelper_1.default.throwBadRequestError("Missing books parameters", res);
        }
        if (books.length > 2) {
            return responseHelper_1.default.throwBadRequestError("Each member only can borrow 2 books at a time", res);
        }
        if (checkMemberDoc.penalty_due) {
            if (checkMemberDoc.penalty_due > new Date()) {
                return responseHelper_1.default.throwBadRequestError(`This member got penalty until ${checkMemberDoc.penalty_due}`, res);
            }
        }
        /**
         * I dont know if this needed but below is a verification function that act
         * if the current total borrowed book of user above 2 it will throw error
        //  */
        // const countCurrentBorrowed = await RentModel.countDocuments({
        //   member_id: memberId,
        //   status: "Borrowed",
        // });
        // if (countCurrentBorrowed > 2) {
        //   return responseHelper.throwBadRequestError(
        //     "This member already have borrow more than 2 books",
        //     res
        //   );
        // } else if (countCurrentBorrowed + books.length > 2) {
        //   return responseHelper.throwBadRequestError(
        //     "This member borrow session will be more than 2 books!",
        //     res
        //   );
        // }
        for (const book of books) {
            const checkBookDoc = yield book_model_1.default.findOne({ book_id: book });
            if (!checkBookDoc) {
                return responseHelper_1.default.throwNotFoundError("One or more books does not exist!", res);
            }
            if (checkBookDoc.book_stocks === 0) {
                return responseHelper_1.default.throwNotFoundError(`${checkBookDoc.book_title} isn't avaiable right now`, res);
            }
            const due_date = new Date();
            due_date.setDate(due_date.getDate() + 7);
            const createNewRentDoc = yield rent_model_1.default.create({
                member_id: memberId,
                book_id: book,
                status: "Borrowed",
                rent_due: due_date,
            });
            if (!createNewRentDoc) {
                return responseHelper_1.default.throwNotFoundError("Something went wrong when processing book rent", res);
            }
            const bookDoc = yield book_model_1.default.findOne({ book_id: book });
            const newStock = (bookDoc === null || bookDoc === void 0 ? void 0 : bookDoc.book_stocks) - 1;
            yield book_model_1.default.findOneAndUpdate({ book_id: book }, { book_stocks: newStock });
            if (createNewRentDoc) {
                borrowedBookList.push(checkBookDoc.book_title);
            }
        }
        return responseHelper_1.default.returnOkResponse("Successfully borrowed the book listed below", res, borrowedBookList);
    }
    catch (e) {
        console.log(e);
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.borrowBook = borrowBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { memberId } = req.params;
        const { books } = req.body;
        const checkMemberDoc = yield member_model_1.default.findOne({ member_id: memberId });
        let penaltyFlag = false;
        if (!checkMemberDoc) {
            return responseHelper_1.default.throwNotFoundError("This member id does not exist", res);
        }
        for (const book of books) {
            const checkRentDoc = yield rent_model_1.default.findOne({
                member_id: memberId,
                book_id: book,
                status: "Borrowed",
            });
            if (!checkRentDoc) {
                return responseHelper_1.default.throwBadRequestError("This member does not borrow this book", res);
            }
            if (checkRentDoc.rent_due < new Date()) {
                penaltyFlag = true;
                const punishment = new Date();
                punishment.setDate(punishment.getDate() + 3);
                yield member_model_1.default.findOneAndUpdate({ member_id: memberId }, { penalty_due: punishment });
            }
            yield rent_model_1.default.findOneAndUpdate({
                member_id: memberId,
                book_id: book,
                status: "Borrowed",
            }, { status: "Returned" });
            const bookDoc = yield book_model_1.default.findOne({ book_id: book });
            const newStock = (bookDoc === null || bookDoc === void 0 ? void 0 : bookDoc.book_stocks) + 1;
            yield book_model_1.default.findOneAndUpdate({ book_id: book }, { book_stocks: newStock });
        }
        if (penaltyFlag === false) {
            return responseHelper_1.default.returnOkResponse("Successfully return all the books", res);
        }
        else if (penaltyFlag === true) {
            return responseHelper_1.default.returnOkResponse("Successfully return all the books, but the member got penalty because of late return", res);
        }
    }
    catch (e) {
        return responseHelper_1.default.throwUnexpectedError("Something went wrong", res);
    }
});
exports.returnBook = returnBook;
