import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";

import { getAllSongs } from "./redux/allSongs";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);
  return (
    <>
      <Header />
      <MainContent />
    </>
  );
}

export default App;
