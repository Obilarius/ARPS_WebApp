import React, { useEffect, useState } from "react";
import axios from "axios";

import "./WSSInfo.scss";
import FolderInfoRow from "./components/FolderInfoRow";
// import HumanReadableSize from "../../../../utils/HumanReadableSize";

const WSSInfo = ({ data }) => {
  // const [owner, setOwner] = useState({ name: "Keinen Besitzer gefunden" });

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
          {/* <FolderInfoRow value={data._path_name} text="Pfad" />
          <FolderInfoRow value={data._unc_path_name} text="Freigegeben als" />
          <FolderInfoRow
            value={<HumanReadableSize bytes={data._size} />}
            text="Größe"
          />
          <FolderInfoRow
            type={owner.isGroup ? "group" : "user"}
            value={owner.name}
            text="Besitzer"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default WSSInfo;
