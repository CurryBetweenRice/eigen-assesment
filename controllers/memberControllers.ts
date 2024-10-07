import { Request, Response } from "express";

import MemberModel from "../models/member.model";
import RentModel from "../models/rent.model";
import responseHelper from "../responseHelper";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { member_id, name } = req.body;

    if (!member_id || !name) {
      return responseHelper.throwBadRequestError(
        "Missing one or more parameters",
        res
      );
    }

    const newMemberDoc = await MemberModel.create({
      member_id,
      name,
    });

    if (!newMemberDoc) {
      return responseHelper.throwNotFoundError(
        "Could not find the member, check the id again",
        res
      );
    }

    return responseHelper.returnCreatedResponse(
      "Created a new member",
      newMemberDoc,
      res
    );
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const memberDocs = await MemberModel.find();

    const payload = [];

    for (const member of memberDocs) {
      const numberOfBook = await RentModel.countDocuments({
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
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const checkMemberDoc = await MemberModel.findOne({ member_id: memberId });

    if (!checkMemberDoc) {
      return responseHelper.throwNotFoundError(
        "Could not find the member, check the id again",
        res
      );
    }

    const number_of_borrowed_book = await RentModel.countDocuments({
      member_id: memberId,
      status: "Borrowed",
    });

    const payload = {
      member_name: checkMemberDoc.name,
      borrowed_book: number_of_borrowed_book,
    };

    return responseHelper.returnOkResponse(
      "Successfully retrieve the membert",
      res,
      payload
    );
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};

export const forgiveMember = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;

    const checkMemberDoc = await MemberModel.findOne({ member_id: memberId });

    if (!checkMemberDoc) {
      return responseHelper.throwNotFoundError(
        "Could not find the member, check the id again",
        res
      );
    }

    const updateMember = await MemberModel.findOneAndUpdate(
      { member_id: memberId },
      {
        $unset: { penalty_due: "" },
      },
      { new: true }
    );

    return responseHelper.returnOkResponse(
      "Successfully forgive the member",
      res
    );
  } catch (e: any) {
    console.log(e);
    return responseHelper.throwUnexpectedError("Something went wrong", res);
  }
};
