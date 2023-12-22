import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import React from "react";
import axios from "axios";
import { RoutesEnum } from "../../types/routes.enum";
import StatisticLayout from "./components/StatisticLayout";

export default function Statistics() {

  let stat1 = "08:00-16:00";
  const stat2 = [
    { x: "amit", y: 2 },
    { x: "ben", y: 3 },
    { x: "gadi", y: 5 },
    { x: "eli", y: 4 }
  ];

  const stat3= [
    { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
  ];

  const stat5 = "24 min";

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/stats`);
      
      stat1 = res.data[0];
      console.log("this is a test amit");
      console.log(res.data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  fetchStats();

  

  return (
    <>
      <NavBar />
      <main>
        <StatisticLayout
           stat1={stat1}
           stat2={stat2}
           stat3={stat3}
        //   stat4={someStat}
           stat5={stat5}
        
        />
      </main>
      <Footer />
    </>
  );
}
