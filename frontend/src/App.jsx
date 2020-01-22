import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FileserverSite from "./components/sites/FileserverSite/FileserverSite";
import ActiveDirectorySite from "./components/sites/ActiveDirectory/ActiveDirectorySite";
import SharepointSite from "./components/sites/Sharepoint/SharepointSite";
import Login from "./components/sites/Login/Login";

const App = () => {
  const [user, setUser] = useState();

  if (!user) {
    return <Login setUser={setUser} />;
  } else {
    return (
      <Router>
        <Navbar user={user} />
        <section className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              {/* <h1>HOME</h1> */}
              <Redirect to="/ad" />
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
  }
};

export default App;
