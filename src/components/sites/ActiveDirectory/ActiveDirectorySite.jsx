import React, { useState, useEffect } from "react";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Axios from "axios";
import Tiles from "./Tiles";
import List from "../../../utils/List/List";

import "./ActiveDirectorySite.scss";
import Searchfield from "../../../utils/Searchfield";

const ActiveDirectorySite = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [computers, setComputers] = useState([]);
  const [listOption, setListOption] = useState("u");

  useEffect(() => {
    Axios.get("http://localhost:8000/ad/users").then(res => {
      setUsers(res.data);
    });

    Axios.get("http://localhost:8000/ad/groups").then(res => {
      setGroups(res.data);
    });

    Axios.get("http://localhost:8000/ad/computers").then(res => {
      setComputers(res.data);
    });
  }, []);

  const clickTileHandler = key => {
    setListOption(key);
  };

  const getList = () => {
    if (listOption === "u") {
      return (
        <List
          key="usersList"
          className="list"
          data={users}
          headers={["AccountName", "Name", "DistinguishedName"]}
          columns={["SamAccountName", "DisplayName", "DistinguishedName"]}
          widths={["400px", "500px", "auto"]}
          onRowClick={user => clickRowHandler(user)}
        />
      );
    }

    if (listOption === "g") {
      return (
        <List
          key="groupsList"
          className="list"
          data={groups}
          headers={[
            "AccountName",
            "Name",
            "DistinguishedName",
            "SecurityGroup",
            "GroupScope"
          ]}
          columns={[
            "SamAccountName",
            "Name",
            "DistinguishedName",
            "IsSecurityGroup",
            "GroupScope"
          ]}
          widths={["400px", "500px", "auto", "150px", "150px"]}
          onRowClick={group => clickRowHandler(group)}
        />
      );
    }

    if (listOption === "c") {
      return (
        <List
          key="computersList"
          className="list"
          data={computers}
          headers={["Name", "Description", "DistinguishedName"]}
          columns={["Name", "Description", "DistinguishedName"]}
          widths={["400px", "500px", "auto"]}
          onRowClick={computer => clickRowHandler(computer)}
        />
      );
    }
  };

  const clickRowHandler = item => {
    console.log(item.SID);
  };

  const onSearchHandler = term => {
    console.log(term);
  };

  return (
    <div id="_16fa12" className="container">
      <SiteWrapperWithHeader title="Active Directory" infoIsOpen={false}>
        <Tiles
          usersCount={users.length}
          groupsCount={groups.length}
          computersCount={computers.length}
          onClick={key => clickTileHandler(key)}
        />
        <Searchfield
          placeholder="Suche..."
          title="Suche"
          onChange={term => onSearchHandler(term)}
        />
        {getList()}
      </SiteWrapperWithHeader>
    </div>
  );
};

export default ActiveDirectorySite;
