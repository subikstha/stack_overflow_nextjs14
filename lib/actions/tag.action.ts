"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.typs";

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
