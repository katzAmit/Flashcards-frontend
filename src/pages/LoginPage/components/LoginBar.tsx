import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import StyleIcon from "@mui/icons-material/Style";
import React from "react";

function LoginBar() {
  return (
    <AppBar
      position="static"
      sx={{ height: "68px", backgroundColor: "#6352B1" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              fontFamily: "monospace",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Flashcards
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default LoginBar;
