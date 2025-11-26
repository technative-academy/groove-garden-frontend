import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import { getSong } from "./redux/song";

function App() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getSong());
    console.log("Effect");
  });

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainContent searchTerm={searchTerm} />
    </>
  );
}

export default App;
