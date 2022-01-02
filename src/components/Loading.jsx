import React from "react";

export default function Loading() {
  return (
    <div
      className="App"
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="container">
        <p className="title is-4">Workout Tracker</p>
        <progress className="progress is-info" />
      </div>
    </div>
  );
}
