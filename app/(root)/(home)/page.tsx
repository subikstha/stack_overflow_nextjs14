import { Button } from "@/components/ui/button";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Link from "next/link";
import Filter from "@/components/shared/Filter";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";

const questions = [
  {
    _id: "1",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [
      { _id: "1", name: "Javascript" },
      { _id: "1", name: "NextJS" },
    ],
    author: {
      _id: "1",
      name: "Subik Shrestha",
      picture: "subik.jpg",
    },
    upvotes: 2000,
    answers: [],
    views: 30,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title:
      "How do ES6 module exports and imports work in JavaScript, and what are the key differences from CommonJS?",
    tags: [
      { _id: "1", name: "Javascript" },
      { _id: "2", name: "NextJS" },
    ],
    author: {
      _id: "1",
      name: "Rebu Shrestha",
      picture: "rebu.jpg",
    },
    upvotes: 100,
    answers: [],
    views: 90,
    createdAt: new Date(),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          placeholder="Search for Questions..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              author={question.author}
              tags={question.tags}
              upvotes={question.upvotes}
              answers={question.answers}
              views={question.views}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No Questions to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
