import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import React from "react";
import axios from "axios";
import { RoutesEnum } from "../../types/routes.enum";
import StatisticLayout from "./components/StatisticLayout";
import { useState, useEffect } from "react";

export default function Statistics() {
  const [stat1, setStat1] = useState("before");
  const [stat2, setStat2] = useState([]);
  const [stat3, setStat3] = useState([]);
  const [stat4, setStat4] = useState([]);
  const [stat5, setStat5] = useState("before");
  // const stat2 = [
  //   { x: "amit", y: 2 },
  //   { x: "ben", y: 3 },
  //   { x: "gadi", y: 5 },
  //   { x: "eli", y: 4 },
  // ];

  // const stat3 = [
  //   { x: 1, y: 120 },
  //   { x: 2, y: 150 },
  //   { x: 3, y: 75 },
  // ];


  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/stats`);
      setStat1(res.data[0]);
      setStat2(res.data[1]);
      setStat3(res.data[2]);
      setStat4(res.data[3]);
      setStat5(res.data[4]);
      
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  fetchStats();
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <StatisticLayout
          stat1={stat1}
          stat2={stat2}
          stat3={stat3}
          stat4={stat4}
          stat5={stat5}
        />
      </main>
    </>
  );
}
