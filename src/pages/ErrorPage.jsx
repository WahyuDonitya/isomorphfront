import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = (props) => {
  const error = useRouteError();
  return (
    <div
      style={{
        backgroundColor: deepPurple[500],
        color: "white",
        height: "100vh",
        paddingTop: "30vh",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h3" align="center" sx={{ mb: 3 }}>
        Wah error ({error.status})...
      </Typography>
      <Typography align="center" variant="h5">
        {error.message ?? error.error.message}
      </Typography>
    </div>
  );
};

export default ErrorPage;
