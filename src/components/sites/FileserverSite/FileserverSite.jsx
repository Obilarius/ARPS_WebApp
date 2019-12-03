/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileserverSite.scss";
import Tiles from "./Tiles";
import Treeview from "./Treeview/Treeview";
import Loader from "../../../utils/Loader";
import FolderInfo from "./FolderInfo/FolderInfo";

const FileserverSite = () => {
  const [fileserver, setFileserver] = useState([]);
  const [folderCount, setFolderCount] = useState(0);
  const [completeSize, setCompleteSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNode, setActiveNode] = useState(null);

  const distinctFileserver = shares => {
    const dfs = [];

    const search = (nameKey, myArray) => {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
          return myArray[i];
        }
      }
    };

    shares.forEach(share => {
      const name = share._unc_path_name.substring(2).split("\\")[0];

      const searchedShare = search(name, dfs);
      if (!searchedShare) {
        // nicht in Array
        const splittedPath = share._unc_path_name.split("\\");
        share.name = splittedPath[splittedPath.length - 1];
        share.type = "Share";
        if (share._has_children) share.children = [];

        dfs.push({
          name: name,
          _size: parseInt(share._size),
          _has_children: true,
          children: [share],
          type: "Server"
        });
      } else {
        // bereits in Array
        const splittedPath = share._unc_path_name.split("\\");
        share.name = splittedPath[splittedPath.length - 1];
        share.type = "Share";
        // share.loading = true;
        if (share._has_children) share.children = [];
        searchedShare._size += parseInt(share._size);
        searchedShare.children.push(share);
      }
    });

    // this.setState({ Fileserver: dfs });
    setFileserver(dfs);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/fileserver/shares").then(res => {
      distinctFileserver(res.data.recordset);

      let sum = 0;
      fileserver.forEach(server => {
        sum += server._size;
      });
      setCompleteSize(sum);
    });

    axios.get("http://localhost:8000/fileserver/foldercount").then(res => {
      setFolderCount(res.data.recordset[0].folderCount);
    });

    setIsLoading(false);
  }, []);

  const getChildNodes = (node, toggled) => {
    if (node.children) {
      node.toggled = toggled;

      if (
        node.children.length === 0 &&
        node._has_children &&
        node.type !== "Server"
      ) {
        axios
          .get(`http://localhost:8000/fileserver/children/${node._path_id}`)
          .then(res => {
            const children = res.data;
            children.forEach(child => {
              const splitPath = child._path_name.split("\\");
              child.name = splitPath[splitPath.length - 1];
              if (child._has_children === true) child.children = [];
            });

            node.children = children;

            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const treeviewOnToggleHandler = (node, toggled) => {
    console.log(node, toggled);
    setIsLoading(true);

    // Deaktiviert alte Node und aktiviert neue Node
    if (activeNode) {
      const oldActiveNode = activeNode;
      oldActiveNode.active = false;
    }
    node.active = true;
    setActiveNode(node);

    getChildNodes(node, toggled);
  };

  return (
    <div id="_ea08ff" className="container">
      {isLoading && <Loader />}
      <div className="content">
        <div className="header">
          <h2>Fileserver</h2>
        </div>
        <Tiles
          distinctFileserver={fileserver.length}
          folderCount={folderCount}
          sumSize={completeSize}
        />
        <div style={{ marginTop: "80px", position: "relative" }}>
          {fileserver.map(server => {
            return (
              <Treeview
                key={server.name}
                server={server}
                onToggle={treeviewOnToggleHandler}
              />
            );
          })}
        </div>
      </div>
      <FolderInfo folder={activeNode} />
    </div>
  );
};

export default FileserverSite;
