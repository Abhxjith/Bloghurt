import React from "react";
import Navbar from "../components/Navbar";  // Adjust the path based on your folder structure
import Landing from "../pages/Landing";     // Adjust the path based on your folder structure

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Landing />
    </div>
  );
};

export default Home;