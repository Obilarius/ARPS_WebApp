import React, { Component } from "react";
import axios from "axios";
import "./SharepointSite.scss";
import Tiles from "./Tiles";
import Treeview from "./Treeview/Treeview";
import Loader from "../../../utils/Loader";
import FolderInfo from "./FolderInfo/FolderInfo";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Searchfield from "../../../utils/Searchfield";
import { Treebeard } from "react-treebeard/dist";

class FileserverSite extends Component {
  state = {
    treeviewData: {
      Title: "ROOT",
      FullUrl: "",
      toggled: true,
      children: []
    },
    pathUrls: [],
    searchDropdown: [],
    searchSID: null,
    loading: false,
    infoIsOpen: false
  };

  componentDidMount = () => {
    axios.get("http://localhost:8000/wss/getPaths").then(res => {
      res.data.forEach(element => {
        element.children = [];
      });

      const rootPaths = { ...this.state.treeviewData };
      rootPaths.children = res.data.filter(path => path.ParentWebId === null);

      this.setState({ pathUrls: res.data, treeviewData: rootPaths });
    });
  };

  treeviewOnToggleHandler = (node, toggled) => {
    this.setState({ loading: true });
    const { treeviewData, activeNode } = this.state;

    // Deaktiviert alte Node und aktiviert neue Node
    if (activeNode) {
      const oldActiveNode = activeNode;
      oldActiveNode.active = false;
    }
    node.active = true;
    node.toggled = toggled;

    node.children = this.state.pathUrls.filter(
      path => path.ParentWebId === node.Id
    );

    this.setState(() => ({
      treeviewData: { ...treeviewData },
      loading: false,
      activeNode: node,
      infoIsOpen: true
    }));
  };

  onSearchHandler = item => {
    this.setState({ searchSID: item.key });
  };

  render() {
    const {
      pathUrls,
      treeviewData,
      searchDropdown,
      loading,
      activeNode,
      infoIsOpen
    } = this.state;

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
              data={treeviewData}
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
