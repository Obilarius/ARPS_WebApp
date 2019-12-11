import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

import "./List.scss";

const List = props => {
  const [data, setData] = useState(props.data);
  const [headers] = useState(props.headers);
  const [columns] = useState(props.columns);
  const [site, setSite] = useState(props.site || 1);
  const [itemsPerSite] = useState(props.itemsPerSite || 30);
  const [sortColumnIndex, setSortColumnIndex] = useState(
    props.sortColumnIndes || 0
  );

  const SortDirection = {
    ASC: 0,
    DESC: 1
  };
  const [sortDir, setSortDir] = useState(props.sortDir || SortDirection.ASC);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  //Clickhandler für die Sortierung nach Spalten inklusive Aktualisierung bestimmter Übergabeparameter
  const columnHeaderClickHandler = index => {
    if (index === sortColumnIndex && sortDir === SortDirection.ASC)
      setSortDir(SortDirection.DESC);
    else if (sortDir !== SortDirection.ASC) setSortDir(SortDirection.ASC);

    setSite(1);
    setSortColumnIndex(index);
  };

  const getPaginatedData = () => {
    const startIndex = (site - 1) * itemsPerSite;
    const endIndex = site * itemsPerSite;

    const sortedData = data.sort((a, b) => {
      const sortColumn = columns[sortColumnIndex];

      let first = a[sortColumn];
      let sec = b[sortColumn];

      if (typeof first === "string") first = first.toLowerCase();
      if (typeof sec === "string") sec = sec.toLowerCase();

      if (first < sec) return sortDir === SortDirection.ASC ? -1 : 1;
      if (first > sec) return sortDir === SortDirection.ASC ? 1 : -1;
      return 0;
    });

    return sortedData.slice(startIndex, endIndex);
  };

  return (
    <div className={`_34d3dd831ac8 ${props.className}`}>
      <Pagination
        itemsCount={data.length}
        itemsPerSite={itemsPerSite}
        site={site}
        onClick={index => setSite(index)}
      />
      <table>
        <TableHeader
          headers={headers}
          sortDir={sortDir}
          sortColumnIndex={sortColumnIndex}
          widths={props.widths}
          onClick={columnHeaderClickHandler}
        />
        <TableBody
          data={getPaginatedData()}
          columns={columns}
          onClick={props.onRowClick}
        />
      </table>
    </div>
  );
};

export default List;
