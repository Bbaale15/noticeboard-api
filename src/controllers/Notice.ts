import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Notice from "../models/Notice";
import Joi from "joi";

const NOT_FOUND_MESSAGE: string = "Item not found";

const createNotice = async (req: Request, res: Response) => {
  const { error } = validateNotice(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const { title, description } = req.body;

  const notice = new Notice({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
  });

  try {
    await notice.save();
    return res.status(201).json({ notice });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getNotice = async (req: Request, res: Response, next: NextFunction) => {
  const noticeId = req.params.id;

  try {
    const notice = await Notice.findById(noticeId);
    return notice
      ? res.status(200).json(notice)
      : res.status(404).json({ message: NOT_FOUND_MESSAGE });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getAllNotices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notices = await Notice.find();
    return res.status(200).json({ notices });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noticeId = req.params.id;

  try {
    const notice = await Notice.findById(noticeId);
    if (notice) {
      const { error } = validateNotice(req.body);
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }

      const { title, description } = req.body;
      notice.set({
        title,
        description,
      });
      await notice.save();
      return res.status(201).json({ notice });
    } else {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noticeId = req.params.id;

  try {
    const notice = await Notice.findByIdAndDelete(noticeId);
    return notice
      ? res.status(201).json({ notice, message: "Deleted" })
      : res.status(404).json({ message: NOT_FOUND_MESSAGE });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const validateNotice = (notice: any) => {
  const schema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(10000).required(),
  });
  return schema.validate(notice);
};

export default {
  createNotice,
  getNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
};
