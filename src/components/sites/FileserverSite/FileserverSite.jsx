import React, { Component } from "react";
import "./FileserverSite.scss";
import Tiles from "./Tiles";

export default class FileserverSite extends Component {
  render() {
    return (
      <div id="_ea08ff" className="container">
        <div className="header">
          <h2>Fileserver</h2>
        </div>
        <Tiles />
      </div>
    );
  }
}
