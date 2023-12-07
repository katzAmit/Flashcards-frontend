import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "../SignIn";
import SignUp from "../../signUpPage/SignUp";
import Album from "../../Homepage/album";

export default function App() {
  
  return (
    //<SignIn />
    <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/signInWrongPassword" element={<SignInWrongPassword />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homePage" element={<Album />} />
    </Routes>
  </Router>
  )
  
}
