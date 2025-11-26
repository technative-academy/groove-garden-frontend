import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Search from "./components/Search/Search";

import { getSong } from "./redux/song";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSong());
    console.log("Effect");
  });

  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}

export default App;
