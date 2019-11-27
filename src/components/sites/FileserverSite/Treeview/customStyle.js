export default {
  tree: {

    base: {
      listStyle: 'none',
      backgroundColor: '#fff',
      margin: 0,
      // padding: "2px 10px",
      color: '#000000',
      fontSize: '14px',
      // border: "1px solid red"
    },
    node: {
      base: {
        position: 'relative',
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 0px',
        display: 'block',
        background: 'Cyan',
      },
      activeLink: {
        background: 'red',
        color: "Gold"
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: "translate(-50%, -50%)",
          height: '100%',
          display: "flex",
          alignItems: "center"
        },
        height: 10,
        width: 10,
        arrow: {
          // fill: '#c4c4c4',
          // strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
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