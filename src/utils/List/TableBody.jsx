import React from "react";

const TableBody = ({ data, columns, onClick }) => {
  return (
    <tbody>
      {data.map((row, i) => {
        return (
          <tr
            key={i}
            onClick={() => onClick(row)}
            className={row.Enabled === 0 ? "disabled" : ""}
          >
            {columns.map((col, j) => {
              return <td key={j}>{row[col]}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
