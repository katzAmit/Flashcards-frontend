import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { DifficultyLevelEnum } from "./Card/types";

interface CardProps {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: DifficultyLevelEnum;
  is_auto: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({
  id,
  question,
  answer,
  category,
  difficulty,
  is_auto,
  onDelete,
  onEdit,
}) => {
  const difficultyToColor = (difficulty: DifficultyLevelEnum) => {
    switch (difficulty) {
      case DifficultyLevelEnum.Easy:
        return "bg-green-500";
      case DifficultyLevelEnum.Medium:
        return "bg-yellow-500";
      case DifficultyLevelEnum.Hard:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg flex flex-col justify-between overflow-y-auto max-height h-72">
      <div className="px-6 py-4">
        <div className="flex justify-between  mb-2">
          <div className="font-bold text-xl">{question}</div>
        </div>
        <p className="text-gray-700 text-base">{answer}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {category}
          </span>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 ${difficultyToColor(
              difficulty
            )}`}
          >
            {difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-2 mb-2">
          <button className="rounded-full" onClick={() => onEdit(id)}>
            <FiEdit />
          </button>
          <button className="rounded-full" onClick={() => onDelete(id)}>
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
};
