import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import React from "react";
import axios from "axios";
import { RoutesEnum } from "../../types/routes.enum";
import StatisticLayout from "./components/StatisticLayout";
import { useState, useEffect } from "react";
import NoDataHero from "./components/NoDataHero";
import { Link, useNavigate } from 'react-router-dom';

// Import statements...

export default function Statistics() {
  const [stat1, setStat1] = useState("before");
  const [stat2, setStat2] = useState([]);
  const [stat3, setStat3] = useState([]);
  const [stat4, setStat4] = useState([]);
  const [stat5, setStat5] = useState("before");
  const [stat6, setStat6] = useState({ easyCategory: "", hardCategory: "" });
  const [loading, setLoading] = useState(true);
  const [presentStats, setPresentStats] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/stats`);
        setStat1(res.data[0]);
        setStat2(res.data[1]);
        setStat3(res.data[2]);
        setStat4(res.data[3]);
        setStat5(res.data[4]);
        setStat6(res.data[5]);
        setPresentStats(res.data[6]);
      } catch (error) {
        console.error("error fetching data", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchStats();
  }, []); // Empty dependency array to ensure useEffect runs only once on mount

  return (
    <>
      <NavBar />
      <main>
        {loading ? (
          <></>
        ) : presentStats ? (
          <StatisticLayout
            stat1={stat1}
            stat2={stat2}
            stat3={stat3}
            stat4={stat4}
            stat5={stat5}
            stat6={stat6}
          />
        ) : (
          <NoDataHero/>
        )}
      </main>
    </>
  );
}

