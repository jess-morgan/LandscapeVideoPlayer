import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ width = "100%" }) => {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left="auto"
      right="auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width={width}
      maxWidth="100%"
      zIndex={10}
      style={{
        pointerEvents: "none"
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
