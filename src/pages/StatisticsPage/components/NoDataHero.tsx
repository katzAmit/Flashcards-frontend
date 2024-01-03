import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RoutesEnum } from "../../../types/routes.enum";

const NoDataHero: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate(RoutesEnum.HOME);
  };

  const handlePracticeClick = () => {
    navigate(RoutesEnum.PRACTICE);
  };

  return (
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-sans font-bold tracking-tight text-gray-900 sm:text-6xl">
            There is not enough data to present your stats
          </h1>
          <p className="mt-6 font-sans text-lg leading-8 text-gray-600">
            You need to create flashcards and start practicing in order for us to present your statistics. Take the first step now!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleGetStartedClick}
              className="rounded-md bg-violet-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create a Flashcard
            </button>

            <button
              onClick={handlePracticeClick}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Practice <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
  );
}

export default NoDataHero;
