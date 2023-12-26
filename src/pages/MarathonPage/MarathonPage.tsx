import Footer from "../Homepage/components/Footer";
import NavBar from "../../components/Navbar";
import React from "react";
import CurrentMarathonsLayout from "./components/CurrentMarathonLayout";

export default function MarathonPage() {
  return (
    <>
      <NavBar />
      <main>
        <CurrentMarathonsLayout />
      </main>
    </>
  );
}
