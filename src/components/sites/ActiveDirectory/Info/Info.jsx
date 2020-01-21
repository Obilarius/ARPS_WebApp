import React, { useState, useEffect } from "react";

import "./Info.scss";
import Axios from "axios";
import UserInfos from "./components/UserInfos";
import GroupInfos from "./components/GroupInfos";
import { proxy } from "../../../../vars";

const Info = ({ item, type }) => {
  const [adElement, setAdElement] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    Axios.get(proxy + "/ldap/sid/" + item.SID).then(res => {
      setAdElement(res.data);
      // console.log(res.data);
    });

    if (type === "u")
      Axios.get(proxy + "/ldap/thumbnail/" + item.SID).then(res => {
        if (res.data !== "") setThumbnail(res.data[0].data);
        else setThumbnail(null);
        // console.log(res.data[0].data);
      });
  }, [item.SID, type]);

  return (
    <div id="_13990f">
      <div className="container">
        <header>
          <h2>{item.DisplayName || item.Name}</h2>
        </header>
        <div className="overview">
          {type === "u" && (
            <UserInfos
              user={adElement}
              sid={item.SID}
              enabled={item.enabled}
              thumbnail={thumbnail}
            />
          )}
          {type === "g" && <GroupInfos group={adElement} sid={item.SID} />}
        </div>
      </div>
    </div>
  );
};

export default Info;
