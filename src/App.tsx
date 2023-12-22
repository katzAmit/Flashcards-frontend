import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/LoginPage/SignIn";
import SignUp from "./pages/signUpPage/SignUp";
import Homepage from "./pages/Homepage/HomePage";
import ProtectedRoutes from "./auth/ProtectedRoute";
import AuthProvider from "./auth/AuthProvider";
import QuizesLayout from "./pages/PracticePage/QuizesLayout";
import MarathonPage from "./pages/MarathonPage/MarathonPage";
import { RoutesEnum } from "./types/routes.enum";
import Quiz from "./pages/PracticePage/Quiz";
import Statistics from "./pages/StatisticsPage/StatisticPage";
import StatisticLayout from "./pages/StatisticsPage/components/StatisticLayout";

const quizData = [
  {
    title: "Recommended Quiz 1 - Biology - 10 Questions - Hard",
    id: "12345-quiz",
    flashcards: [
      { question: "What is the capital of France?", answer: "Paris", id: "1" },
      {
        question: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        id: "2",
      },
      // Add more flashcards as needed
    ],
  },
];

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
          <Route path={RoutesEnum.HOME} element={<Homepage />} />
            {/* <Route path={RoutesEnum.HOME} element={<Statistics />} /> */}
            <Route path={RoutesEnum.PRACTICE} element={<QuizesLayout />} />
            {/* <Route path={RoutesEnum.PRACTICE} element={<Quiz start_time = {new Date()} id={quizData[0].id} title={quizData[0].title} flashcards={quizData[0].flashcards} />} /> */}
          </Route>
          <Route path={RoutesEnum.REGISTER} element={<SignUp />} />
          <Route path={RoutesEnum.HOME} element={<Homepage />} />
          <Route path={RoutesEnum.LOGIN} element={<SignIn />} />
          <Route path={RoutesEnum.MARATHON} element={<MarathonPage />} />
          <Route path={RoutesEnum.STATS} element={<Statistics />} />
        </Routes>
      </Router>
    </AuthProvider>
    // <SignIn />
  );
}
