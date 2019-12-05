import React, { useState, useEffect } from "react";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Axios from "axios";
import Tiles from "./Tiles";
import List from "./components/List";

import "./ActiveDirectorySite.scss";

const ActiveDirectorySite = () => {
  const [users, setUsers] = useState([]);
  const [groups, seGroups] = useState([]);
  const [computers, setComputers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/ad/users").then(res => {
      setUsers(res.data);
    });

    Axios.get("http://localhost:8000/ad/groups").then(res => {
      seGroups(res.data);
    });

    Axios.get("http://localhost:8000/ad/computers").then(res => {
      setComputers(res.data);
    });
  }, []);

  return (
    <div id="_16fa12" className="container">
      <SiteWrapperWithHeader title="Active Directory" infoIsOpen={false}>
        <Tiles
          usersCount={users.length}
          groupsCount={groups.length}
          computersCount={computers.length}
        />
        <List src={users} site={1} itemsPerSite={20} />
      </SiteWrapperWithHeader>
    </div>
  );
};

export default ActiveDirectorySite;
