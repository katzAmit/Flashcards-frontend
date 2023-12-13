import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import CardsLayout from "../Homepage//components/CardsLayout";
import { useEffect, useState } from "react";
import { FlashCard } from "../../types/card.interface";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { RoutesEnum } from "../../types/routes.enum";
import QuizesLayout from "./components/QuizesLayout";

export default function PracticePage(){

    return(

        <>
      <NavBar />
      <main>
        <QuizesLayout />
      </main>
      <Footer />
    </>

    );
} 