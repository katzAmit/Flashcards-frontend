import React, { useState, useEffect } from "react";
import { RoutesEnum } from "../../../types/routes.enum";
import Quiz from "../../PracticePage/Quiz";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

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
        title={`Quiz ${current_day + 1}`}
        id={currentQuiz.id}
        start_time={currentQuiz.start_time}
        onFinish={() => {
          navigate(RoutesEnum.MARATHON);
        }}
        marathon_or_practice="marathon"
        marathon_id={marathon_id}
      />
    );
  }

  return (
    <main style={{ marginTop: "40px" }}>
      <div
        style={{
          backgroundColor: "#2E3B55",
          color: "#FFFFFF",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "start",
          marginTop: "20px",
          position: "relative",
        }}
      >
        <h5
          style={{
            color: "white",
            marginBottom: "1.5rem",
            fontWeight: 700,
            letterSpacing: ".3rem",
          }}
        >
          {`${category} Marathon`}
        </h5>
        <p style={{ color: "white" }}>
          📅 {`Day ${current_day + 1} out of ${total_days}`}
        </p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleContinueMarathon()}
          sx={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            fontWeight: "bold",
            backgroundColor: "#2E3B55",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1c2733",
            },
          }}
        >
          Continue Marathon
        </Button>
      </div>
    </main>
  );
};
