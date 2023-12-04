import * as React from "react";
import "./SideBar.css";
function SideBar() {
  return (
    <div class="sidebar">
      <ul style={{ listStyle: "none" }}>
        <li class="option">
          <button
            class="btn btn-option btn-home"
            style={{ backgroundColor: "#3b82f6" }}
          >
            Home
          </button>
        </li>
        <li class="option">
          <button class="btn btn-option" style={{ backgroundColor: "#3b82f6" }}>
            Quiz
          </button>
        </li>
        <li class="option">
          <button class="btn btn-option" style={{ backgroundColor: "#3b82f6" }}>
            Statistics
          </button>
        </li>
        <li class="option">
          <button class="btn btn-option" style={{ backgroundColor: "#3b82f6" }}>
            Marathon
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
