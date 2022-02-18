import asyncHandler from "express-async-handler";
import Page from "../models/Page.js";
import User from "../models/User.js";
import { newPage, updatePage } from "../utils/validation.js";
import mongoose from "mongoose";

export const newPageController = asyncHandler(async (req, res) => {
  await newPage.validateAsync(req.body);

  const page = new Page({
    title: req.body.title || "Untitled",
    content: req.body.content || "",
    createdAt: Date.now(),
  });

  try {
    const savedPage = await User.updateOne(
      { uid: req.userId },
      { $push: { pages: page } }
    );
    res.status(201).json({ message: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getSpecificPage = asyncHandler(async (req, res) => {
  var pageId = new mongoose.Types.ObjectId(req.params.pageId);
  try {
    const page = await User.aggregate([
      { $unwind: "$pages" },
      { $match: { "pages._id": pageId, user_id: req.userId } },
      { $project: { "pages.title": 1, "pages.content": 1 } },
    ]);
    res.json({ data: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getAllPages = asyncHandler(async (req, res) => {
  try {
    const page = await User.find(
      {
        uid: req.userId,
      },
      { pages: { title: 1, _id: 1 } }
    );
    res.json({ data: page[0].pages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const updatePageController = asyncHandler(async (req, res) => {
  await updatePage.validateAsync(req.body);

  try {
    let query;
    if (req.body.action === "title") {
      query = { "pages.$.title": req.body.title };
    } else {
      query = { "pages.$.content": req.body.content };
    }
    const page = await User.updateOne(
      {
        uid: req.userId,
        "pages._id": req.params.pageId,
      },
      { $set: query }
    );
    res.json({ data: page });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//route for handling delete
export const deletePageController = asyncHandler(async (req, res) => {
  var pageId = new mongoose.Types.ObjectId(req.params.pageId);

  try {
    //delete functionality
    const page = await User.update(
      { uid: req.userId },
      { $pull: { pages: { _id: pageId } } }
    );
    return res.status(200).json({
      message: "Page has been deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
