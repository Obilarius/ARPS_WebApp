import React, { useState, useEffect } from "react";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Axios from "axios";
import Tiles from "./Tiles";
import List from "../../../utils/List/List";

import "./ActiveDirectorySite.scss";
import Searchfield from "../../../utils/Searchfield";
import Info from "./Info/Info";

const ActiveDirectorySite = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [computers, setComputers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredComputers, setFilteredComputers] = useState([]);
  const [activeTile, setActiveTile] = useState("u");
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:8000/ad/users").then(res => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });

    Axios.get("http://localhost:8000/ad/groups").then(res => {
      setGroups(res.data);
      setFilteredGroups(res.data);
    });

    Axios.get("http://localhost:8000/ad/computers").then(res => {
      setComputers(res.data);
      setFilteredComputers(res.data);
    });
  }, []);

  const clickTileHandler = key => {
    setActiveTile(key);
    setFilteredUsers(users);
    setFilteredGroups(groups);
    setFilteredComputers(computers);
    setInfoIsOpen(false);
  };

  const getList = () => {
    if (activeTile === "u") {
      return (
        <List
          key="usersList"
          className="list"
          data={filteredUsers}
          headers={["AccountName", "Name", "DistinguishedName"]}
          columns={["SamAccountName", "DisplayName", "DistinguishedName"]}
          widths={["400px", "500px", "auto"]}
          onRowClick={user => clickRowHandler(user)}
        />
      );
    }

    if (activeTile === "g") {
      return (
        <List
          key="groupsList"
          className="list"
          data={filteredGroups}
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

    if (activeTile === "c") {
      return (
        <List
          key="computersList"
          className="list"
          data={filteredComputers}
          headers={["Name", "Description", "DistinguishedName"]}
          columns={["Name", "Description", "DistinguishedName"]}
          widths={["400px", "500px", "auto"]}
          onRowClick={computer => clickRowHandler(computer)}
        />
      );
    }
  };

  const clickRowHandler = item => {
    // console.log(item);

    setActiveItem(item);
    setInfoIsOpen(true);
  };

  const onSearchHandler = term => {
    const filterList = (list, term) => {
      return list.filter(item => {
        const values = Object.values(item);
        let ret = false;

        values.forEach(value => {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(term.toLowerCase())
          )
            ret = true;
          return;
        });

        return ret;
      });
    };

    if (activeTile === "u") setFilteredUsers(filterList(users, term));
    if (activeTile === "g") setFilteredGroups(filterList(groups, term));
    if (activeTile === "c") setFilteredComputers(filterList(computers, term));
  };

  return (
    <div id="_16fa12" className="container">
      <SiteWrapperWithHeader title="Active Directory" infoIsOpen={infoIsOpen}>
        <Tiles
          usersCount={users.length}
          groupsCount={groups.length}
          computersCount={computers.length}
          activeTile={activeTile}
          onClick={key => clickTileHandler(key)}
        />
        <Searchfield
          placeholder="Suche..."
          title="Suche"
          onChange={term => onSearchHandler(term)}
        />
        {getList()}
      </SiteWrapperWithHeader>
      {infoIsOpen && <Info item={activeItem} type={activeTile} />}
    </div>
  );
};

export default ActiveDirectorySite;
