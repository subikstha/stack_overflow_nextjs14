import React from "react";
import RenderTag from "../shared/RenderTag";

interface UserProps {
  _id: string;
  tags: {
    _id: string;
    name: string;
  }[];
}

const UserCard = ({ tags }: UserProps) => {
  return (
    <div>
      {tags.map((tag) => (
        <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
      ))}
    </div>
  );
};

export default UserCard;
