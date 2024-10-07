import { Request, Response } from "express";

import BookModel from "../models/book.model";
import responseHelper from "../responseHelper";

export const updateBookStock = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const { stocks } = req.body;

    if (!stocks) {
      return responseHelper.throwBadRequestError(
        "Missing stocks parameter",
        res
      );
    }

    const bookDoc = await BookModel.findOne({ book_id: bookId });

    if (!bookDoc) {
      return responseHelper.throwNotFoundError(
        "Could not fine the book, check the id",
        res
      );
    }

    const updateBookStockDoc = await BookModel.findOneAndUpdate(
      { book_id: bookId },
      { book_stocks: stocks },
      { new: true }
    );

    if (!updateBookStockDoc) {
      return responseHelper.throwBadRequestError(
        "Something went wrong when updating the book stock",
        res
      );
    }

    return responseHelper.returnOkResponse(
      "Successfully update the book stock",
      res,
      updateBookStockDoc
    );
  } catch (e: any) {
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};

export const getAllBook = async (req: Request, res: Response) => {
  try {
    const allBookDoc = await BookModel.find();

    res.status(200).send({
      success: true,
      message: "Succesfully retrieve all book Docs",
      payload: allBookDoc,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).send("Something went really wrong.");
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { book_id, book_title, book_author, initial_stock } = req.body;

    if (!book_id || !book_title || !book_author || !initial_stock) {
      return responseHelper.throwBadRequestError(
        "Missing one or more paramters",
        res
      );
    }

    const saveBookDoc = await BookModel.create({
      book_id,
      book_title,
      book_author,
      book_stocks: initial_stock,
    });

    if (!saveBookDoc) {
      return responseHelper.throwBadRequestError(
        "SOmething went wrong when creating the book",
        res
      );
    }

    return responseHelper.returnCreatedResponse(
      "New book created",
      saveBookDoc,
      res
    );
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};
