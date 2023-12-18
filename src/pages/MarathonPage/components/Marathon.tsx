import React from "react";

interface MarathonProps {
  id: number;
  category: string;
  total_days: number;
  current_day: number;
}

export const Marathon: React.FC<MarathonProps> = ({
  id,
  category,
  total_days,
  current_day,
}) => {
  return (
    <div className="marathon-line flex items-center bg-white p-2 mb-2 mx-auto max-w-md rounded-lg shadow-md w-full">
      <p className="marathon-category flex-grow text-sm font-semibold mr-4">
        {category}
      </p>
      <p className="marathon-progress text-gray-600">
        📅{current_day}/{total_days}
      </p>
    </div>
  );
};
