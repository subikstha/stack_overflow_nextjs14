"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.typs";
import Tag from "@/database/tag.model";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({}).sort({ createdAt: -1 });

    // console.log(tags);
    return {tags};
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
