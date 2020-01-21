import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import FileserverSite from "./components/sites/FileserverSite/FileserverSite";
import ActiveDirectorySite from "./components/sites/ActiveDirectory/ActiveDirectorySite";
import SharepointSite from "./components/sites/Sharepoint/SharepointSite";

const App = () => {
  const [user, setUser] = useState({ cn: "DummyUser" });

  // useEffect(() => {
  //   axios.get(`/ldap/user`).then(res => {
  //     setUser(res.data);
  //   });
  // }, []);

  if (user) {
    return (
      <Router>
        <Navbar userName={user.cn} />
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
  } else return <></>;
};

export default App;
