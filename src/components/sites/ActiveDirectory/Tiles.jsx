import React from "react";
import Tile from "../Tile";

import { ReactComponent as UserIcon } from "../../../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupIcon } from "../../../assets/FontAwesome/users-solid.svg";
import { ReactComponent as ComputerIcon } from "../../../assets/FontAwesome/desktop-solid.svg";

const Tiles = props => {
  return (
    <div className="tiles">
      <Tile
        icon={<UserIcon />}
        number={props.usersCount}
        text="Benutzer im AD"
      />
      <Tile
        icon={<GroupIcon />}
        number={props.groupsCount}
        text="Gruppen im AD"
      />
      <Tile
        icon={<ComputerIcon />}
        number={props.computersCount}
        text="Computer im AD"
      />
    </div>
  );
};

export default Tiles;
