import React from "react";

import { ReactComponent as UserSolid } from "../../../../../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupSolid } from "../../../../../assets/FontAwesome/users-solid.svg";

const FolderInfoRow = props => {
  const icon = () => {
    switch (props.type) {
      case "user":
        return <UserSolid />;
      case "group":
        return <GroupSolid />;
      default:
        break;
    }
  };

  return (
    <>
      {props.value && (
        <>
          <div>{props.text}</div>
          <div>
            {props.type && <span className="icon">{icon()}</span>}
            {props.value}
          </div>
        </>
      )}
    </>
  );
};

export default FolderInfoRow;
