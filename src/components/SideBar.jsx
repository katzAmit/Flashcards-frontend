import * as React from "react";

function SideBar(){
    return(
        <div class="sidebar">
        <a class="active" href="#My Flashcards">
          Home
        </a>
        <a href="#Quiz">Quiz</a>
        <a href="#Marathon">Marathon</a>
        <a href="#Statistics">Statistics</a>
      </div>
    );
}

export default SideBar;
