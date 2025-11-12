import React from "react";

import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <div>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}

export default MainContent;
