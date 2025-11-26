import React from "react";

import { Outlet } from "react-router-dom";

function MainContent({ searchTerm }) {
  return (
    <div>
      <Outlet context={{ searchTerm }}/>
    </div>
  );
}

export default MainContent;
