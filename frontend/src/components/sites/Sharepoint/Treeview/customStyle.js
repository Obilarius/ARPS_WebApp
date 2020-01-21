export default {
  tree: {
    node: {
      header: {
        base: {
          // display: 'inline-block',
          // verticalAlign: 'top',
          color: '#000'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px',
        background: "#fff"
      },
      loading: {
        color: "#000",
        position: "fixed",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
        zIndex: "100"
      }
    }
  }
};