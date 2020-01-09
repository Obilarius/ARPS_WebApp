import React, { Component } from "react";
import axios from "axios";
import "./FileserverSite.scss";
import Tiles from "./Tiles";
import Treeview from "./Treeview/Treeview";
import Loader from "../../../utils/Loader";
import FolderInfo from "./FolderInfo/FolderInfo";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Searchfield from "../../../utils/Searchfield";

class FileserverSite extends Component {
  state = {
    Fileserver: [],
    searchDropdown: [],
    searchSID: null,
    folderCount: 0,
    sumSize: 0,
    loading: false,
    infoIsOpen: false
  };

  distinctFileserver = shares => {
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
        // const splittedPath = share._unc_path_name.split("\\");
        // share.name = splittedPath[splittedPath.length - 1];
        // share.type = "Share";
        // if (share._has_children) share.children = [];

        dfs.push({
          name: name,
          _size: parseInt(share._size),
          _has_children: true,
          // children: [share],
          children: [],
          type: "Server"
        });
      } else {
        // bereits in Array
        // const splittedPath = share._unc_path_name.split("\\");
        // share.name = splittedPath[splittedPath.length - 1];
        // share.type = "Share";
        // // share.loading = true;
        // if (share._has_children) share.children = [];
        searchedShare._size += parseInt(share._size);
        // searchedShare.children.push(share);
      }
    });

    this.setState({ Fileserver: dfs });
  };

  componentDidMount = () => {
    axios.get("http://localhost:8000/fileserver/shares").then(res => {
      this.distinctFileserver(res.data);

      let sum = 0;
      this.state.Fileserver.forEach(server => {
        sum += server._size;
      });
      this.setState({ sumSize: sum });
    });

    axios.get("http://localhost:8000/fileserver/foldercount").then(res => {
      this.setState({ folderCount: res.data.recordset[0].folderCount });
    });

    axios.get("http://localhost:8000/ad/userandgroupssid").then(res => {
      const result = [];

      res.data.forEach(item => {
        result.push({
          key: item.SID,
          icon: item.isGroup,
          value: item.Name
        });
      });

      this.setState({ searchDropdown: result });
    });
  };

  getChildNodes = (node, toggled) => {
    if (node.children) {
      node.toggled = toggled;

      if (node.children.length === 0 && node._has_children) {
        if (node.type !== "Server") {
          // Children from Shares and Folders
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

              this.setState({ loading: false });
            });
        } else {
          // Children from Server
          axios
            .get(`http://localhost:8000/fileserver/shares/${node.name}`)
            .then(res => {
              res.data.forEach(share => {
                const splittedPath = share._unc_path_name.split("\\");
                share.name = splittedPath[splittedPath.length - 1];
                share.type = "Share";
                // share.loading = true;
                if (share._has_children) share.children = [];
                node.children.push(share);
              });

              this.setState({ loading: false });
            });
        }
      } else {
        this.setState({ loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  treeviewOnToggleHandler = (node, toggled) => {
    this.setState({ loading: true });
    const { activeNode } = this.state;

    // Deaktiviert alte Node und aktiviert neue Node
    if (activeNode) {
      const oldActiveNode = activeNode;
      oldActiveNode.active = false;
    }
    node.active = true;
    this.setState({ activeNode: node, infoIsOpen: true });

    this.getChildNodes(node, toggled);
  };

  onSearchHandler = item => {
    this.setState({ searchSID: item.key });
  };

  render() {
    const {
      Fileserver,
      searchDropdown,
      folderCount,
      sumSize,
      loading,
      activeNode,
      infoIsOpen
    } = this.state;

    return (
      <div id="_ea08ff" className="container">
        {loading && <Loader />}
        <SiteWrapperWithHeader title="Fileserver" infoIsOpen={infoIsOpen}>
          <Tiles
            distinctFileserver={Fileserver.length}
            folderCount={folderCount}
            sumSize={sumSize}
          />
          <Searchfield
            placeholder="Suche..."
            title="User oder Gruppe"
            dropdownItems={searchDropdown}
            onSearch={this.onSearchHandler}
          />
          <div className="treeviews">
            {Fileserver.map(server => {
              return (
                <Treeview
                  key={server.name}
                  server={server}
                  onToggle={this.treeviewOnToggleHandler}
                />
              );
            })}
          </div>
          {/* <div className="treeviews_own">
            {Fileserver.map(server => {
              return (
                <TreeviewOwn
                  key={server.name}
                  server={server}
                  onToggle={this.treeviewOnToggleHandler}
                />
              );
            })}
          </div> */}
        </SiteWrapperWithHeader>
        {infoIsOpen && <FolderInfo folder={activeNode} />}
      </div>
    );
  }
}

export default FileserverSite;
