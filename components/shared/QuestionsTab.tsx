import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  console.log("user id in question tab", userId);
  const result = await getUserQuestions({ userId, page: 1 });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          author={question.author}
          clerkId={clerkId}
          tags={question.tags}
          upvotes={question.upvotes}
          answers={question.answers}
          views={question.views}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
};

export default QuestionsTab;
