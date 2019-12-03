import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FileserverSite from "./components/sites/FileserverSite/FileserverSite_ohneHook";

const App = () => {
  return (
    <Router>
      <Navbar />
      <section className="content">
        <Switch>
          <Route path="/home">
            <h1>HOME</h1>
          </Route>
          <Route path="/fileserver">
            <FileserverSite />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
