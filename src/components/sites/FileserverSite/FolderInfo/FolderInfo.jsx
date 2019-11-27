import React from "react";
import "./FolderInfo.scss";
import { ReactComponent as FolderSolid } from "../../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as ShareSolid } from "../../../../assets/FontAwesome/share-solid.svg";

const FolderInfo = () => {
  return (
    <div id="_13990f">
      <div className="container">
        <header>
          {/* <FolderSolid /> */}
          Ordnername
        </header>
        <div className="overview">
          <div>Kompletter Pfad</div>
          <div>\\Pfad\wo\auch\immer\hin</div>
          <div>Freigegeben als</div>
          <div>\\Freigabe</div>
          <div>Größe</div>
          <div>460GB</div>
          <div>Besitzer</div>
          <div>Administrator</div>
        </div>
      </div>
    </div>
  );
};

export default FolderInfo;
