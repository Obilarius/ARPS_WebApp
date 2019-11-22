import React from "react";
import Tile from "../Tile";
import { ReactComponent as FolderSolid } from "../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as HDDSolid } from "../../../assets/FontAwesome/hdd-solid.svg";

const Tiles = () => {
  return (
    <div className="tiles">
      <Tile icon={<ServerSolid />} number="4" text="verschiedene Fileserver" />
      <Tile icon={<FolderSolid />} number="5210" text="Ordner auf Fileserver" />
      <Tile
        icon={<HDDSolid />}
        number={
          <>
            30<span>TB</span>
          </>
        }
        text="belegter Speicherplatz"
      />
    </div>
  );
};

export default Tiles;
