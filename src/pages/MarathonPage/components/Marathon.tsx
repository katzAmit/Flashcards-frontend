import React, { useState } from "react";
import { RoutesEnum } from "../../../types/routes.enum";
import Quiz from "../../PracticePage/Quiz";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MarathonProps {
  marathon_id: string;
  category: string;
  total_days: number;
  current_day: number;
}

export const Marathon: React.FC<MarathonProps> = ({
  marathon_id,
  category,
  total_days,
  current_day,
}) => {
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState<any>(null); // Store the current quiz data

  const handleContinueMarathon = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/current_marathon_quiz",
        {
          marathon_id: marathon_id,
        }
      );
      const currentQuizData = response.data;
      setCurrentQuiz(currentQuizData);
    } catch (error) {
      console.error("Error fetching current quiz:", error);
    }
  };

  // If currentQuiz data is available, render the Quiz component
  if (currentQuiz) {
    return (
      <Quiz
        flashcards={currentQuiz.flashcards}
        title={currentQuiz.title}
        id={currentQuiz.id}
        start_time={currentQuiz.start_time}
        onFinish={() => {
          // Finish action when the Quiz component is completed
          // Example: navigate to the next route after finishing the quiz
          navigate(RoutesEnum.MARATHON);
        }}
      />
    );
  }

  return (
    <div className="marathon-line flex items-center bg-white p-2 mb-2 mx-auto max-w-md rounded-lg shadow-md w-full">
      <p className="marathon-category flex-grow text-sm font-semibold mr-4">
        {category}
      </p>
      <p className="marathon-progress text-gray-600">
        📅{current_day}/{total_days}
      </p>
      <button onClick={handleContinueMarathon}>Continue Marathon</button>
    </div>
  );
};
