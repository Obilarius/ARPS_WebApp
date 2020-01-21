import React, { useEffect, useState } from "react";
import axios from "axios";

import "./WSSInfo.scss";
import FolderInfoRow from "./components/FolderInfoRow";
import WSSAcl from "./components/WSSAcl";
import { proxy } from "../../../../vars";
// import HumanReadableSize from "../../../../utils/HumanReadableSize";

const WSSInfo = ({ data }) => {
  // const [owner, setOwner] = useState({ name: "Keinen Besitzer gefunden" });
  const [acl, setAcl] = useState(null);

  useEffect(() => {
    if (data.Id) {
      axios
        .get(proxy + `/wss/getRights/${data.Id}/${data.ContentDB}`)
        .then(res => {
          setAcl(res.data);
        });
    }

    // const grouped = groupBy(acl, ace => ace.GroupTitle);
  }, [data.ContentDB, data.Id]);

  return (
    <div id="_13990f">
      <div className="container">
        <header>
          {/* <NodeIcon type={folder.type} width="24px" /> */}
          <h2>{data.Title}</h2>
        </header>
        <div className="overview">
          <FolderInfoRow value={data.Id} text="WebId" />
          <FolderInfoRow value={data.FullUrl} text="FullUrl" />
          <FolderInfoRow value={data.ContentDB} text="Content Datenbank" />
        </div>

        <div className="rights">
          <WSSAcl acl={acl} />
          {/* {acl &&
            Object.keys(acl).map(grp => {
              // console.log(acl[grp]);
              return (
                <React.Fragment key={grp}>
                  <div className="group-header">
                    {grp !== "null" ? grp : ""}
                  </div>
                  {acl[grp].map(ace => {
                    return (
                      <React.Fragment key={ace.Title + ace.UserTitle}>
                        <div className="ace ace-usertitle">{ace.UserTitle}</div>
                        <div className="ace ace-title">{ace.Title}</div>
                        <div className="ace ace-domaingroup">
                          {ace.tp_DomainGroup}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default WSSInfo;
