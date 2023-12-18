import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import CurrentMarathonsLayout from "./components/CurrentMarathonLayout";

export default function MarathonPage() {
  return (
    <>
      <NavBar />
      <main>
        <CurrentMarathonsLayout />
      </main>
      <Footer />
    </>
  );
}
