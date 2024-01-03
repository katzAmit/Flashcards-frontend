import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { RoutesEnum } from "../../../types/routes.enum";

const NoDataMarathon: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate(RoutesEnum.HOME);
  };


  return (
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-sans font-bold tracking-tight text-gray-900 sm:text-6xl">
          Insufficient Data for a Marathon Experience
          </h1>
          <p className="mt-6 font-sans text-lg leading-8 text-gray-600">
            You need to create some flashcards in order for us to generate marathons for you. Take the first step now!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleGetStartedClick}
              className="rounded-md bg-violet-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create a Flashcard
            </button>
          </div>
        </div>
      </div>
  );
}

export default NoDataMarathon;
