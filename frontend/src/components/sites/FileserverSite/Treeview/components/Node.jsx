import React from "react";

const Node = props => {
  return (
    <div>
      <div>props.name</div>
      <ul>
        {props.children.map(child => {
          return (
            <li>
              <Node key={child.key} src={child} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Node;
