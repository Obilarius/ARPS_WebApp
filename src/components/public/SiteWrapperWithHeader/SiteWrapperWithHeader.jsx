import React from "react";

import "./SiteWrapperWithHeader.scss";

const SiteWrapperWithHeader = ({ title, infoIsOpen, children }) => {
  return (
    <div id="_997489" className={"content " + (infoIsOpen ? "info-open" : "")}>
      <div className="header">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
};

export default SiteWrapperWithHeader;
