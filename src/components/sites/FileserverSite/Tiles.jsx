import React from "react";
import Tile from "../Tile";
import { ReactComponent as FolderSolid } from "../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as HDDSolid } from "../../../assets/FontAwesome/hdd-solid.svg";

const Tiles = props => {
  const numberWithCommas = x => {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const humanFileSize = (bytes, si) => {
    var thresh = 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    var units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    // return bytes.toFixed(1) + " " + units[u];
    return (
      <>
        {bytes.toFixed(1)}
        <span>{units[u]}</span>
      </>
    );
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
        number={<>{humanFileSize(props.sumSize, true)}</>}
        text="belegter Speicherplatz"
      />
    </div>
  );
};

export default Tiles;
