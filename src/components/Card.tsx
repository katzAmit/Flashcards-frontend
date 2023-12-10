import React, { useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";

interface CardProps {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  question,
  answer,
  category,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg flex flex-col justify-between overflow-y-auto max-height h-72">
      <div className="px-6 py-4">
        <div className="flex justify-between  mb-2">
          <div className="font-bold text-xl">{question}</div>
        </div>
        <p className="text-gray-700 text-base">{answer}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {category}
        </span>
        <div className="flex items-center gap-2 ml-2 mb-2">
          <button className="rounded-full">
            <FiEdit />
          </button>
          <button className="rounded-full">
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};
