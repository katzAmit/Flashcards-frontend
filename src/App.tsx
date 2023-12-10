import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignIn from "./pages/LoginPage/SignIn";
import SignUp from "./pages/signUpPage/SignUp";
import Homepage from "./pages/Homepage/HomePage";
import ProtectedRoutes from "./auth/ProtectedRoute";
import AuthProvider from "./auth/AuthProvider";
import { RoutesEnum } from "./types/routes.enum";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Homepage />} />
            <Route path={RoutesEnum.HOME} element={<Homepage />} />
          </Route>
          <Route path={RoutesEnum.REGISTER} element={<SignUp />} />
          <Route path={RoutesEnum.HOME} element={<Homepage />} />
          <Route path={RoutesEnum.LOGIN} element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
    // <SignIn />
  );
}
