import React from "react";
import Tile from "../Tile";
import { ReactComponent as FolderSolid } from "../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as HDDSolid } from "../../../assets/FontAwesome/hdd-solid.svg";
import HumanReadableSize from "../../../utils/HumanReadableSize";

const Tiles = props => {
  const numberWithCommas = x => {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="tiles">
      <Tile
        icon={<ServerSolid />}
        number={props.distinctFileserver}
        text="verschiedene Fileserver"
      />
      <Tile
        icon={<FolderSolid />}
        number={numberWithCommas(props.folderCount)}
        text="Ordner auf Fileserver"
      />
      <Tile
        icon={<HDDSolid />}
        number={<HumanReadableSize bytes={props.sumSize} />}
        text="belegter Speicherplatz"
      />
    </div>
  );
};

export default Tiles;
