import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "../SignIn";
import SignUp from "../../signUpPage/SignUp";
import Homepage from "../../Homepage/components/App";

export default function App() {
  
  return (
    //<SignIn />
    <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/signInWrongPassword" element={<SignInWrongPassword />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homePage" element={<Homepage />} />
    </Routes>
  </Router>
  )
  
}
