import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/LoginPage/SignIn";
import SignUp from "./pages/signUpPage/SignUp";
import Homepage from "./pages/Homepage/HomePage";
import ProtectedRoutes from "./auth/ProtectedRoute";
import AuthProvider from "./auth/AuthProvider";
import QuizesLayout from "./pages/PracticePage/components/QuizesLayout";
import MarathonPage from "./pages/MarathonPage/MarathonPage";
import { RoutesEnum } from "./types/routes.enum";
import Quiz from "./pages/PracticePage/components/Quiz";
import Statistics from "./pages/StatisticsPage/StatisticPage";
import StatisticLayout from "./pages/StatisticsPage/components/StatisticLayout";
import PracticePage from "./pages/PracticePage/PracticePage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={RoutesEnum.REGISTER} element={<SignUp />} />
          <Route path={RoutesEnum.LOGIN} element={<SignIn />} />

          <Route element={<ProtectedRoutes />}>
            <Route path={RoutesEnum.HOME} element={<Homepage />} />
            <Route path={RoutesEnum.PRACTICE} element={<PracticePage />} />
            <Route path={RoutesEnum.STATS} element={<Statistics />} />
            <Route path={RoutesEnum.MARATHON} element={<MarathonPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
