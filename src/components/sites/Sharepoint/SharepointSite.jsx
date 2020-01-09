import React, { Component } from "react";
import axios from "axios";
import "./SharepointSite.scss";
import Tiles from "./Tiles";
import Treeview from "./Treeview/Treeview";
import Loader from "../../../utils/Loader";
import FolderInfo from "./FolderInfo/FolderInfo";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Searchfield from "../../../utils/Searchfield";

class FileserverSite extends Component {
  state = {
    pathUrls: [],
    searchDropdown: [],
    searchSID: null,
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
    axios.get("http://localhost:8000/wss/getPaths").then(res => {
      res.data.forEach(element => {
        element.children = [];
      });

      this.setState({ pathUrls: res.data });
    });
  };

  getChildNodes = (node, toggled) => {
    const children = this.state.pathUrls.filter(
      path => path.ParentWebId === node.Id
    );
    node.children = children;

    this.setState({ loading: false });
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
      pathUrls,
      searchDropdown,
      loading,
      activeNode,
      infoIsOpen
    } = this.state;

    const rootPaths = pathUrls.filter(path => path.ParentWebId === null);

    return (
      <div id="_72bd0a" className="container">
        {loading && <Loader />}
        <SiteWrapperWithHeader title="Sharepoint" infoIsOpen={infoIsOpen}>
          <Tiles pathCount={pathUrls.length} />
          <Searchfield
            placeholder="Suche..."
            title="User oder Gruppe"
            dropdownItems={searchDropdown}
            onSearch={this.onSearchHandler}
          />
          <div className="treeviews">
            <Treeview
              data={rootPaths}
              onToggle={this.treeviewOnToggleHandler}
            />
          </div>
        </SiteWrapperWithHeader>
        {infoIsOpen && <FolderInfo folder={activeNode} />}
      </div>
    );
  }
}

export default FileserverSite;
