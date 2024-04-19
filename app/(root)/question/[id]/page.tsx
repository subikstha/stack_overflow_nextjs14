import { getQuestionById } from "@/lib/actions/question.action";
import React from "react";

const page = async ({ params }) => {
  console.log(params);
  //   const questionId = params._id;
  const result = await getQuestionById({ questionId: params.id });
  return <div>Question with name {result.title}</div>;
};

export default page;
