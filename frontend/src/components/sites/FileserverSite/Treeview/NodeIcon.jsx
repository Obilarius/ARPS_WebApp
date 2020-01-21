import React from "react";

import { ReactComponent as FolderSolid } from "../../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as ShareSolid } from "../../../../assets/FontAwesome/share-solid.svg";

const NodeIcon = ({ type, width }) => {
  const style = {
    width: width ? width : "18px",
    marginRight: "5px"
  };

  switch (type) {
    case "Server":
      return <ServerSolid style={style} />;
    case "Share":
      return <ShareSolid style={style} />;
    case "Folder":
      return <FolderSolid style={style} />;
    default:
      return <FolderSolid style={style} />;
  }
};

export default NodeIcon;
