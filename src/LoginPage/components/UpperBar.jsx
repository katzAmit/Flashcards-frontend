import * as React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";

function UpperBar() {
  return (
    <AppBar position="relative">
      <Toolbar style={{ position: "relative" }}>
        <StyleIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Flashcards
        </Typography>
        <div style={{ position: "absolute", right: 20 }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
          ></button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default UpperBar;
