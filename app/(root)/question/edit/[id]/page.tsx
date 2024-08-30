import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  console.log(
    "This is the userid and params in question edit page",
    userId,
    params.id,
  );

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-9">Edit Question</h1>
      <Question
        mongoUserId={JSON.stringify(mongoUser?._id)}
        type="Edit"
        questionDetails={JSON.stringify(result)}
      />
    </div>
  );
};

export default Page;
