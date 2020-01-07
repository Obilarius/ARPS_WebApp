import React from "react";
import Tile from "../Tile";

import { ReactComponent as UserIcon } from "../../../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupIcon } from "../../../assets/FontAwesome/users-solid.svg";
import { ReactComponent as ComputerIcon } from "../../../assets/FontAwesome/desktop-solid.svg";

const Tiles = props => {
  return (
    <div className="tiles">
      <Tile
        className={props.activeTile === "u" ? "active" : ""}
        icon={<UserIcon />}
        number={props.usersCount}
        text="Benutzer im AD"
        onClick={() => props.onClick("u")}
      />
      <Tile
        className={props.activeTile === "g" ? "active" : ""}
        icon={<GroupIcon />}
        number={props.groupsCount}
        text="Gruppen im AD"
        onClick={() => props.onClick("g")}
      />
      <Tile
        className={props.activeTile === "c" ? "active" : ""}
        icon={<ComputerIcon />}
        number={props.computersCount}
        text="Computer im AD"
        onClick={() => props.onClick("c")}
      />
    </div>
  );
};

export default Tiles;
