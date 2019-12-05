import React from "react";

const List = ({ src, site, itemsPerSite }) => {
  let sortColumn = "name";
  let sortDirection = "asc";

  const startIndex = (site - 1) * itemsPerSite;
  const endIndex = site * itemsPerSite;
  const paginatedArray = src.slice(startIndex, endIndex);

  const domain = dN => {
    const ret = [];
    const splitAr = dN.split(",");

    splitAr.forEach(element => {
      const splitEl = element.split("=");
      if (splitEl[0] === "DC") ret.push(splitEl[1]);
    });

    return ret.join(".");
  };

  return (
    <div className="list">
      <div className="header">Name</div>
      <div className="header">DistinguishedName</div>
      <div className="header">Domain</div>

      {paginatedArray.map(item => {
        domain(item.DistinguishedName);

        return (
          <React.Fragment key={item.SID}>
            <div>{item.SamAccountName.replace("$", "")}</div>
            <div>{item.DistinguishedName}</div>
            <div>{domain(item.DistinguishedName)}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default List;
