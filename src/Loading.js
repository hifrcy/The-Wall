import React from "react";
import "./Loading.css";
const Loading = () => (
  <div>
    <div className="twitter-bird-animation" />
    <div className="loading">
      <span className="text">Loading</span>
      <span className="blob1 blob" />
      <span className="blob2 blob" />
      <span className="blob3 blob" />
    </div>
  </div>
);

export default Loading;
