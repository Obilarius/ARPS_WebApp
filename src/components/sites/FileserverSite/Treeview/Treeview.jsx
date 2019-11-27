import React, { Component } from "react";
import { Treebeard } from "react-treebeard";
import decorators from "react-treebeard/dist/components/Decorators";
import customTheme from "./customStyle";
import { ReactComponent as FolderSolid } from "../../../../assets/FontAwesome/folder-solid.svg";
import { ReactComponent as ServerSolid } from "../../../../assets/FontAwesome/server-solid.svg";
import { ReactComponent as ShareSolid } from "../../../../assets/FontAwesome/share-solid.svg";
import HumanReadableSize from "../../../../utils/HumanReadableSize";

const nodeIcon = type => {
  const style = {
    width: "18px",
    marginRight: "5px"
  };

  switch (type) {
    case "Server":
      return <ServerSolid style={style} />;
    case "Share":
      return <ShareSolid style={style} />;
    case "Folder":
      return <FolderSolid style={style} />;
    default:
      return <FolderSolid style={style} />;
  }
};

const CustomHeader = ({ node, style, prefix }) => {
  const newStyle = { ...style.base, width: "100%" };
  if (node._hidden) {
    newStyle.color = "#c2c2c2";
    newStyle.fill = "#c2c2c2";
  }

  return (
    <div style={newStyle}>
      <div
        style={{
          ...style.title,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {nodeIcon(node.type)}
          {node.name}
        </div>
        <div>
          <HumanReadableSize bytes={node._size} />
        </div>
      </div>
    </div>
  );
};

class CutomContainer extends decorators.Container {
  render() {
    const { style, decorators, onClick, node } = this.props;

    let styleNode = {
      padding: "2px 10px",
      display: "flex"
    };
    if (node.active) styleNode = { ...styleNode, background: "#c3dff7" };

    let styleArrowDiv = {
      width: "20px",
      display: "flex",
      alignItems: "center"
    };
    let styleArrow = {
      fill: "transparent",
      strokeWidth: "1",
      stroke: "black"
    };
    if (node.toggled)
      styleArrow = {
        ...styleArrow,
        fill: "black",
        transform: "rotate(90deg)"
      };

    return (
      <div
        style={styleNode}
        onClick={onClick}
        ref={ref => (this.clickableRef = ref)}
      >
        <div style={styleArrowDiv}>
          {node._has_children && (
            <svg height="12" width="12" style={styleArrow}>
              <polygon points="4,2 4,10 8,6" />
            </svg>
          )}
        </div>
        <decorators.Header node={node} style={style.header} />
      </div>
    );
  }
}

export default class Treeview extends Component {
  render() {
    decorators.Header = CustomHeader;
    decorators.Container = CutomContainer;

    return (
      <Treebeard
        data={this.props.server}
        onToggle={this.props.onToggle}
        style={customTheme}
        decorators={decorators}
      />
    );
  }
}
