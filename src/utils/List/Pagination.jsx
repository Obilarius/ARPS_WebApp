import React from "react";

const Pagination = ({ itemsCount, itemsPerSite, site, onClick }) => {
  let pageCount = Math.ceil(itemsCount / itemsPerSite);

  let ret = [];
  for (let i = 1; i <= pageCount; i++) {
    const classNames = i === site ? "active" : "";
    ret.push(
      <div key={i} onClick={() => onClick(i)} className={classNames}>
        {i}
      </div>
    );
  }

  return <div className="pagination">{ret}</div>;
};

export default Pagination;
