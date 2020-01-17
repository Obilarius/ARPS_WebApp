import React from "react";

import { ReactComponent as UserSolid } from "../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupSolid } from "../assets/FontAwesome/users-solid.svg";
import { ReactComponent as CheckSolid } from "../assets/FontAwesome/check-solid.svg";
import { ReactComponent as FolderIcon } from "../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as SubfolderIcon } from "../assets/FontAwesome/folder-tree-duotone.svg";
import { ReactComponent as FilesIcon } from "../assets/FontAwesome/file-alt-duotone.svg";

const FileSystemRight_Share = ({ acl }) => {
  const getFSR = (n, p, i) => {
    const b = index => {
      if ((n & (1 << index)) !== 0) {
        return true;
      } else {
        return false;
      }
    };

    const folder = () => {
      if (p === 0) return true;
      return false;
    };

    const subfolder = () => {
      if (i === 1 || i === 3) return true;
      return false;
    };

    const files = () => {
      if (i === 2 || i === 3) return true;
      return false;
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
      },
      propagnation: {
        Folder: folder(),
        Subfolder: subfolder(),
        Files: files()
      }
    };
  };

  const getHeader = () => {
    return (
      <>
        <div className="header header-title">SHARE</div>
        {/* <div className="header">
          <p>Inherited</p>
        </div> */}
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
        const fsr = getFSR(item._rights, item._flags, item._flags);

        const checkmarksClassList = item._is_inherited
          ? "checkmark inherit"
          : "checkmark";

        return (
          <React.Fragment
            key={`${item._sid}-${item._rights}-${item._propagation_flags}-${item._inheritance_flags}`}
          >
            <div className="name">
              <span className="icon">
                {item._is_group ? (
                  <GroupSolid />
                ) : (
                  <UserSolid style={{ marginLeft: "3px" }} />
                )}
              </span>
              {item.Name}
            </div>

            {/* <div className="checkmark">
              {item._is_inherited && <CheckSolid />}
            </div> */}
            <div className={checkmarksClassList}>
              {fsr.effectiveRights.FullControl && <CheckSolid />}
            </div>
            <div className={checkmarksClassList}>
              {fsr.effectiveRights.Modify && <CheckSolid />}
            </div>
            <div className={checkmarksClassList}>
              {fsr.effectiveRights.ReadAndExecute && <CheckSolid />}
            </div>
            <div className={checkmarksClassList}>
              {fsr.effectiveRights.Write && <CheckSolid />}
            </div>
            <div className={checkmarksClassList}>
              {fsr.effectiveRights.Read && <CheckSolid />}
            </div>
            <div className={checkmarksClassList}>
              {fsr.rights.ListDirectory && <CheckSolid />}
            </div>
            <div className="propagnation">
              <div>{fsr.propagnation.Folder && <FolderIcon />}</div>
              <div>{fsr.propagnation.Subfolder && <SubfolderIcon />}</div>
              <div>{fsr.propagnation.Files && <FilesIcon />}</div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default FileSystemRight_Share;
