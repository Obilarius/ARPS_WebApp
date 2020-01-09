import React from "react";
import Tile from "../Tile";
import { ReactComponent as FolderTree } from "../../../assets/FontAwesome/folder-tree-duotone.svg";
// import HumanReadableSize from "../../../utils/HumanReadableSize";

const Tiles = props => {
  // const numberWithCommas = x => {
  //   if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // };

  return (
    <div className="tiles">
      <Tile icon={<FolderTree />} number={props.pathCount} text="Pfade" />
    </div>
  );
};

export default Tiles;
