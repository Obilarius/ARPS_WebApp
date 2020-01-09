import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FileserverSite from "./components/sites/FileserverSite/FileserverSite";
import ActiveDirectorySite from "./components/sites/ActiveDirectory/ActiveDirectorySite";
import SharepointSite from "./components/sites/Sharepoint/SharepointSite";

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
          <Route path="/ad">
            <ActiveDirectorySite />
          </Route>
          <Route path="/wss">
            <SharepointSite />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};

export default App;
