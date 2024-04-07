import UserCard from "@/components/cards/UserCard";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import React from "react";

export const page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <LocalSearchBar
          route="/"
          placeholder="Search by Username..."
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          otherClasses="flex-1"
        />
        <div>
            <UserCard _id="123" tags={[{_id: '1', name: 'html'},{_id: '2', name: 'css'}]} />
        </div>
    </div>
  );
};

export default page;
