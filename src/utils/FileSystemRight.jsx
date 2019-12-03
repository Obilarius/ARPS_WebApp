import React from "react";

import { ReactComponent as UserSolid } from "../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupSolid } from "../assets/FontAwesome/users-solid.svg";
import { ReactComponent as CheckSolid } from "../assets/FontAwesome/check-solid.svg";

const FileSystemRight = ({ acl }) => {
  const getFSR = n => {
    const b = index => {
      if ((n & (1 << index)) !== 0) {
        return true;
      } else {
        return false;
      }
    };

    return {
      rights: {
        ReadData: b(0),
        ListDirectory: b(0),
        WriteData: b(1),
        CreateFiles: b(1),
        AppendData: b(2),
        CreateDirectories: b(2),
        ReadExtendedAttributes: b(3),
        WriteExtendedAttributes: b(4),
        ExecuteFile: b(5),
        Traverse: b(5),
        DeleteSubdirectoriesAndFiles: b(6),
        ReadAttributes: b(7),
        WriteAttributes: b(8),
        Delete: b(16),
        ReadPermissions: b(17),
        ChangePermissions: b(18),
        TakeOwnership: b(19),
        Synchronize: b(20),
        FullControl: b(15)
      },
      effectiveRights: {
        Read: b(0) && b(3) && b(7) && b(17),
        ReadAndExecute: b(0) && b(3) && b(7) && b(17) && b(5),
        Write: b(1) && b(2) && b(4) && b(8),
        Modify:
          b(0) &&
          b(3) &&
          b(7) &&
          b(17) &&
          b(5) &&
          b(1) &&
          b(2) &&
          b(4) &&
          b(8) &&
          b(16),
        FullControl:
          b(0) &&
          b(3) &&
          b(7) &&
          b(17) &&
          b(5) &&
          b(1) &&
          b(2) &&
          b(4) &&
          b(8) &&
          b(16) &&
          b(6) &&
          b(18) &&
          b(19),
        Synchronize: b(20)
      }
    };
  };

  const getHeader = () => {
    return (
      <>
        <div></div>
        <div className="header">
          <p>Inherited</p>
        </div>
        <div className="header">
          <p>FullControl</p>
        </div>
        <div className="header">
          <p>Modify</p>
        </div>
        <div className="header">
          <p>ReadAndExecute</p>
        </div>
        <div className="header">
          <p>Write</p>
        </div>
        <div className="header">
          <p>Read</p>
        </div>
        <div className="header">
          <p>ListDirectory</p>
        </div>
        <div className="header">
          <p>Propagation</p>
        </div>
      </>
    );
  };

  return (
    <>
      {getHeader()}

      {acl.map(item => {
        const fsr = getFSR(item._rights);

        return (
          <React.Fragment key={`${item._sid}-${item._rights}`}>
            <div className="name">
              <span className="icon">
                {item._is_group ? (
                  <GroupSolid />
                ) : (
                  <UserSolid style={{ marginLeft: "3px" }} />
                )}
              </span>
              {item._identity_name}
            </div>

            <div className="checkmark">
              {item._is_inherited ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.effectiveRights.FullControl ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.effectiveRights.Modify ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.effectiveRights.ReadAndExecute ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.effectiveRights.Write ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.effectiveRights.Read ? <CheckSolid /> : ""}
            </div>
            <div className="checkmark">
              {fsr.rights.ListDirectory ? <CheckSolid /> : ""}
            </div>
            <div>{item._propagation_flags}</div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FileSystemRight;
