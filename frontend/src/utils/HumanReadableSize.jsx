import React from "react";

function HumanReadableSize(props) {
  let bytes = parseInt(props.bytes);
  const thresh = 1024;
  if (Math.abs(bytes) < thresh) {
    return (
      <>
        {bytes}
        <span style={{ paddingLeft: "5px", fontWeight: "bold" }}>B</span>
      </>
    );
  }
  var units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);

  return (
    <>
      {bytes.toFixed(1)}
      <span style={{ paddingLeft: "5px", fontWeight: "bold" }}>{units[u]}</span>
    </>
  );
}

export default HumanReadableSize;
