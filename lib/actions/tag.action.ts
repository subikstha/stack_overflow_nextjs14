"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetTopInteractedTagsParams,
  GetQuestionsByTagIdParams,
} from "./shared.typs";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const {searchQuery} = params;
    const query: FilterQuery<typeof Tag> = {}
    if(searchQuery) {
      query.$or = [{name: {$regex: new RegExp(searchQuery, "i")}}]
    }
    console.log('query in getAllTags action is', query);

    const tags = await Tag.find(query).sort({ createdAt: -1 });

    // console.log(tags);
    return { tags };
  } catch (error) {
    console.log(error);
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    // const { userId, limit = 3 } = params;
    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "React" },
      { _id: "2", name: "CSS" },
      { _id: "3", name: "NextJS" },
    ];

    // Find interactions for the user and group by tags...
    // We need to later create a new entity called as interaction later
  } catch (error) {
    console.log(error);
  }
}

export async function getQuestonsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkid name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
  }
}
