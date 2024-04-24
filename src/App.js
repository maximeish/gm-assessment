import React from "react";
import Navigation from "./components/Navigation";
import Map from "./components/Map";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 flex-col">
      <Map />
      <Navigation />
      <ToastContainer />
    </div>
  );
};

export default App;
