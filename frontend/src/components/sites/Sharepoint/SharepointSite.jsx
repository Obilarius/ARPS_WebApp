import React, { Component } from "react";
import axios from "axios";
import "./SharepointSite.scss";
import Tiles from "./Tiles";
import Treeview from "./Treeview/Treeview";
import Loader from "../../../utils/Loader";
import WSSInfo from "./WSSInfo/WSSInfo";
import SiteWrapperWithHeader from "../../public/SiteWrapperWithHeader/SiteWrapperWithHeader";
import Searchfield from "../../../utils/Searchfield";
import { proxy } from "../../../vars";

class FileserverSite extends Component {
  state = {
    treeviewData: [],
    pathUrls: [],
    searchDropdown: [],
    searchSID: null,
    loading: true,
    infoIsOpen: false
  };

  componentDidMount = () => {
    axios.get(proxy + "/wss/getPaths").then(res => {
      res.data.forEach(element => {
        element.children = [];
      });

      // const rootPaths = { ...this.state.treeviewData };
      // rootPaths.children = res.data.filter(path => path.ParentWebId === null);

      const tvData = res.data.filter(path => path.ParentWebId === null);

      this.setState({
        pathUrls: res.data,
        treeviewData: tvData,
        loading: false
      });
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
      treeviewData: [...treeviewData],
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

    let treeview = [];
    let lastUrlBase = "";

    treeviewData.forEach(element => {
      let urlBase = element.FullUrl.split("/")[0];

      if (lastUrlBase !== urlBase) {
        treeview.push(
          <div className="section-header" key={urlBase}>
            {urlBase}
          </div>
        );
        lastUrlBase = urlBase;
      }

      treeview.push(
        <Treeview
          key={element.Title + "-" + element.Id}
          data={element}
          onToggle={this.treeviewOnToggleHandler}
        />
      );
    });

    return (
      <div id="_72bd0a" className="container">
        {loading && <Loader />}
        <SiteWrapperWithHeader title="Sharepoint" infoIsOpen={infoIsOpen}>
          <Tiles pathCount={pathUrls.length} />
          {/* <Searchfield
            placeholder="Suche..."
            title="User oder Gruppe"
            dropdownItems={searchDropdown}
            onSearch={this.onSearchHandler}
          /> */}
          <div className="treeviews">{treeview}</div>
        </SiteWrapperWithHeader>
        {infoIsOpen && <WSSInfo data={activeNode} />}
      </div>
    );
  }
}

export default FileserverSite;
