import React from "react";

function MyCollections() {
  const loggedIn = true;
  return (
    <>
      {loggedIn === true ? (
        <div>
          <h1>My Collections</h1>
        </div>
      ) : (
        <div>
          <h1>Please Log In</h1>
        </div>
      )}
    </>
  );
}

export default MyCollections;
