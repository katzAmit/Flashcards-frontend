import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "../SignIn";
import SignUp from "../../signUpPage/SignUp";
import Album from "../../Homepage/album";
import SignInWrongPassword from "../SignInWrongPassword";

export default function App() {
  
  return (
    //<SignIn />
    <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signInWrongPassword" element={<SignInWrongPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homePage" element={<Album />} />
    </Routes>
  </Router>
  )
  
}
