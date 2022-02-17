function setModalContentHeight(height, width) {
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(192, 192, 192, 0.75)",
      backdropFilter: "blur(5px)",
      zIndex: 2,
    },
    content: {
      position: "absolute",
      width: width,
      height: height,
      margin: "auto",
      background: "#ffe291",
      boxShadow: "0 3px 7px rgba(0, 0, 0, 0.3)",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "20px",
      outline: "none",
      padding: "20px",
    },
  };

  return modalStyle;
}

export default setModalContentHeight;
