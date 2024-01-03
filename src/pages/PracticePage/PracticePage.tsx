import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import QuizesLayout from "./components/QuizesLayout";
import axios from "axios";
import NoDataPractice from "./components/NoDataPractice";


export default function PracticePage() {

  const [categoriesNum, setCategoriesNum] = useState<number>(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategoriesNum((response.data).length);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoriesNum(-1);
    }
    finally{setLoading(false);}
  };
  fetchCategories();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        {loading? <></> : categoriesNum === 0 ? (<NoDataPractice/>) :
        (<QuizesLayout />)}
      </main>
    </>
  );
}
