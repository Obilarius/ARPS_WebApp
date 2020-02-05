import React from "react";

import { ReactComponent as UserSolid } from "../../../../../assets/FontAwesome/user-solid.svg";
import { ReactComponent as GroupSolid } from "../../../../../assets/FontAwesome/users-solid.svg";
import nov_logo from "../../../../../assets/novanta_logo.png";
import ArgesLogo from "../../../../../assets/ArgesLogo";

const WSSAcl = ({ acl }) => {
  if (acl === null) return <></>;

  // console.log(acl);

  const ACL = Object.keys(acl).map(grp => {
    return (
      acl[grp][0].UserTitle && (
        <React.Fragment key={grp}>
          <div className="group-header">{grp !== "null" ? grp : ""}</div>
          {acl[grp].map((ace, i) => {
            return (
              <React.Fragment key={ace.Title + ace.UserTitle + i}>
                <div className="ace ace-icon">
                  {ace.isDomainGroup ? <GroupSolid /> : <UserSolid />}
                </div>
                {/* <div className="ace ace-usertitle">{ace.UserTitle}</div> */}
                <div className="ace ace-usertitle">
                  {ace.Login.startsWith("GSIG") ? (
                    <img src={nov_logo} />
                  ) : (
                    <ArgesLogo />
                  )}
                  {ace.Login}
                </div>
                <div className="ace ace-title">{ace.Title}</div>
                <div className="ace ace-domaingroup">{ace.tp_DomainGroup}</div>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      )
    );
  });

  return (
    <>
      <div className="group-header">Rechte:</div>
      {ACL}
    </>
  );
};

export default WSSAcl;
