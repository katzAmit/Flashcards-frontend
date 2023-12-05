import * as React from "react";
import "./SideBar.css";
function SideBar() {
  return (
    <div class="sidebar">
      <ul style={{ listStyle: "none" }}>
        <li class="option">
          <button class="btn btn-option btn-home">Home</button>
        </li>
        <li class="option">
          <button class="btn btn-option">Quiz</button>
        </li>
        <li class="option">
          <button class="btn btn-option">Statistics</button>
        </li>
        <li class="option">
          <button class="btn btn-option">Marathon</button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
