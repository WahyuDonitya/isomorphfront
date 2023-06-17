import React from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default Root;
