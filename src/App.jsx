import React from "react";
import Navbar from "./components/Navbar/Navbar";
import FileserverSite from "./components/sites/FileserverSite/FileserverSite";

function App() {
  return (
    <>
      <Navbar />
      <div className="content">
        <FileserverSite />
      </div>
    </>
  );
}

export default App;
