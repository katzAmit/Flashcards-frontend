import * as React from "react";
import { Typography } from "@mui/material";

function MainHeader() {
  return (
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      gutterBottom
    >
      My Flashcards
    </Typography>
  );
}
export default MainHeader;
