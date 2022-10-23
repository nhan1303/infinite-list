import React from "react";
import UserListingPage from "@features/users/pages/ListingPage";

function App() {
  return (
    <div className="App">
      <UserListingPage />
      <div
        id="measure-layer"
        style={{
          display: "block",
          visibility: "hidden",
          position: "absolute",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default App;
