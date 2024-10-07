import { Request, response, Response } from "express";
import BookModel from "../models/book.model";
import RentModel from "../models/rent.model";
import MemberModel from "../models/member.model";
import responseHelper from "../responseHelper";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const { books } = req.body;

    const checkMemberDoc = await MemberModel.findOne({ member_id: memberId });

    if (!checkMemberDoc) {
      return responseHelper.throwNotFoundError(
        "This member id does not exist",
        res
      );
    }

    let borrowedBookList = [];
    if (!books) {
      return responseHelper.throwBadRequestError(
        "Missing books parameters",
        res
      );
    }

    if (books.length > 2) {
      return responseHelper.throwBadRequestError(
        "Each member only can borrow 2 books at a time",
        res
      );
    }

    if (checkMemberDoc.penalty_due) {
      if (checkMemberDoc.penalty_due > new Date()) {
        return responseHelper.throwBadRequestError(
          `This member got penalty until ${checkMemberDoc.penalty_due}`,
          res
        );
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
      const checkBookDoc = await BookModel.findOne({ book_id: book });

      if (!checkBookDoc) {
        return responseHelper.throwNotFoundError(
          "One or more books does not exist!",
          res
        );
      }

      if (checkBookDoc.book_stocks === 0) {
        return responseHelper.throwNotFoundError(
          `${checkBookDoc.book_title} isn't avaiable right now`,
          res
        );
      }

      const due_date = new Date();
      due_date.setDate(due_date.getDate() + 7);

      const createNewRentDoc = await RentModel.create({
        member_id: memberId,
        book_id: book,
        status: "Borrowed",
        rent_due: due_date,
      });

      if (!createNewRentDoc) {
        return responseHelper.throwNotFoundError(
          "Something went wrong when processing book rent",
          res
        );
      }
      const bookDoc = await BookModel.findOne({ book_id: book });
      const newStock = bookDoc?.book_stocks! - 1;

      await BookModel.findOneAndUpdate(
        { book_id: book },
        { book_stocks: newStock }
      );

      if (createNewRentDoc) {
        borrowedBookList.push(checkBookDoc.book_title);
      }
    }

    return responseHelper.returnOkResponse(
      "Successfully borrowed the book listed below",
      res,
      borrowedBookList
    );
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const { books } = req.body;

    const checkMemberDoc = await MemberModel.findOne({ member_id: memberId });

    let penaltyFlag = false;

    if (!checkMemberDoc) {
      return responseHelper.throwNotFoundError(
        "This member id does not exist",
        res
      );
    }

    for (const book of books) {
      const checkRentDoc = await RentModel.findOne({
        member_id: memberId,
        book_id: book,
        status: "Borrowed",
      });

      if (!checkRentDoc) {
        return responseHelper.throwBadRequestError(
          "This member does not borrow this book",
          res
        );
      }

      if (checkRentDoc.rent_due! < new Date()) {
        penaltyFlag = true;
        const punishment = new Date();
        punishment.setDate(punishment.getDate() + 3);
        await MemberModel.findOneAndUpdate(
          { member_id: memberId },
          { penalty_due: punishment }
        );
      }

      await RentModel.findOneAndUpdate(
        {
          member_id: memberId,
          book_id: book,
          status: "Borrowed",
        },
        { status: "Returned" }
      );

      const bookDoc = await BookModel.findOne({ book_id: book });
      const newStock = bookDoc?.book_stocks! + 1;

      await BookModel.findOneAndUpdate(
        { book_id: book },
        { book_stocks: newStock }
      );
    }

    if (penaltyFlag === false) {
      return responseHelper.returnOkResponse(
        "Successfully return all the books",
        res
      );
    } else if (penaltyFlag === true) {
      return responseHelper.returnOkResponse(
        "Successfully return all the books, but the member got penalty because of late return",
        res
      );
    }
  } catch (e: any) {
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};
