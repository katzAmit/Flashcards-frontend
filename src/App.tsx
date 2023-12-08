import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./pages/LoginPage/SignIn";
import SignUp from "./pages/signUpPage/SignUp";
import Homepage from "./pages/Homepage/HomePage";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homePage" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  )

}
