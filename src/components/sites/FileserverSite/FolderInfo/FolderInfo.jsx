import React, { useEffect, useState } from "react";
import axios from "axios";

import "./FolderInfo.scss";
import FolderInfoRow from "./components/FolderInfoRow";
import NodeIcon from "../Treeview/NodeIcon";
import HumanReadableSize from "../../../../utils/HumanReadableSize";
import FileSystemRight from "../../../../utils/FileSystemRight";

const FolderInfo = ({ folder }) => {
  // const [size, setSize] = useState(0);
  const [owner, setOwner] = useState({ name: "Keinen Besitzer gefunden" });
  const [acl, setAcl] = useState([]);

  useEffect(() => {
    if (folder._owner_sid)
      axios
        .get("http://localhost:8000/fsdetails/owner/" + folder._owner_sid)
        .then(res => {
          const tempOwner = res.data[0];
          tempOwner.name = `${tempOwner.name} (${tempOwner.secName})`;
          setOwner(tempOwner);
        });
  }, [folder._owner_sid]);

  useEffect(() => {
    if (folder._path_id)
      axios
        .get(`http://localhost:8000/fsdetails/fsr/${folder._path_id}`)
        .then(res => {
          setAcl(res.data);
        });
  }, [folder._path_id]);

  return (
    <div id="_13990f">
      <div className="container">
        <header>
          <NodeIcon type={folder.type} width="24px" />
          <h2>{folder.name}</h2>
        </header>
        <div className="overview">
          <FolderInfoRow value={folder._path_name} text="Pfad" />
          <FolderInfoRow value={folder._unc_path_name} text="Freigegeben als" />
          <FolderInfoRow
            value={<HumanReadableSize bytes={folder._size} />}
            text="Größe"
          />
          <FolderInfoRow
            type={owner.isGroup ? "group" : "user"}
            value={owner.name}
            text="Besitzer"
          />
        </div>
        <div className="fsr">
          <FileSystemRight acl={acl} />
        </div>
      </div>
    </div>
  );
};

export default FolderInfo;
