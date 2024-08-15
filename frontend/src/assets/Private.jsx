import React from "react";
import { Outlet } from "react-router-dom";

const Private = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Private;
