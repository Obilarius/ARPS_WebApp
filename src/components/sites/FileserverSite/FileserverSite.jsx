import React, { Component } from "react";
import axios from "axios";
import "./FileserverSite.scss";
import Tiles from "./Tiles";

export default class FileserverSite extends Component {
  state = {
    fileserver: [],
    distinctFileserver: [],
    folderCount: 0,
    sumSize: 0
  };

  distinctFileserver = () => {
    const fs = this.state.fileserver;
    const dfs = [];

    fs.forEach(server => {
      const name = server._unc_path_name.substring(2).split("\\")[0];
      if (dfs.indexOf(name) === -1) dfs.push(name);
    });

    this.setState({ distinctFileserver: dfs });
  };

  componentDidMount = () => {
    axios.get("http://localhost:8000/fileserver/shares").then(res => {
      this.setState({ fileserver: res.data.recordset });
      this.distinctFileserver();
    });

    axios.get("http://localhost:8000/fileserver/foldercount").then(res => {
      this.setState({ folderCount: res.data.recordset[0].folderCount });
    });

    axios.get("http://localhost:8000/fileserver/sumsize").then(res => {
      this.setState({ sumSize: res.data.recordset[0].sum });
    });
  };

  render() {
    return (
      <div id="_ea08ff" className="container">
        <div className="header">
          <h2>Fileserver</h2>
        </div>
        <Tiles
          distinctFileserver={this.state.distinctFileserver.length}
          folderCount={this.state.folderCount}
          sumSize={this.state.sumSize}
        />
      </div>
    );
  }
}
