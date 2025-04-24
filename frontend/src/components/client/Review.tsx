import { CircleUserRound, Star } from "lucide-react";
import React from "react";

export default function Review({ review }: { review: Review }) {
  const totalStars = 5;
  const avatarColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  
  function getAvatarColor(name: string) {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatarColors[hash % avatarColors.length];
  }
  
  const stars = Array.from({ length: totalStars }, (_, i) => (
    <Star
      key={i}
      size={18}
      strokeWidth={0}
      fill={i < review.rating ? "#FDCC0D" : "#E5E7EB"} // gold if filled, gray if empty
    />
  ));
  return (
    <div className="py-2">
      <div className="flex">
        <div>
          <div className={`text-white  flex justify-center items-center text-xl bg-red-500 p-4 mr-5 rounded-full w-12 h-12 ${getAvatarColor(review.reviewerName)}`}>
            <span>{review.reviewerName.charAt(0)}</span>
          </div>
        </div>
        <div>
          <p className="font-bold"> {review.reviewerName}</p>
          <div className="flex">{stars}</div>
          <div className="">{review.description}</div>
        </div>
      </div>
    </div>
  );
}
