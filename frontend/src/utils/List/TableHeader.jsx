import React from "react";

import { ReactComponent as TriangleUpIcon } from "../../assets/FontAwesome/caret-up-solid.svg";
import { ReactComponent as TriangleDownIcon } from "../../assets/FontAwesome/caret-down-solid.svg";

const TableHeader = ({
  headers,
  sortDir,
  sortColumnIndex,
  onClick,
  widths
}) => {
  const icon = sortDir === 0 ? <TriangleUpIcon /> : <TriangleDownIcon />;

  return (
    <thead>
      <tr>
        {headers.map((column, i) => {
          return (
            <th key={i} onClick={() => onClick(i)} style={{ width: widths[i] }}>
              {sortColumnIndex === i && icon}
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
