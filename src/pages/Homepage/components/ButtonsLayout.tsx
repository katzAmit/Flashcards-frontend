import * as React from "react";
import IconButton from '@mui/material/IconButton';
import ButtonGroup from "@mui/material/ButtonGroup";
import { ContentCopy, Delete, Edit } from "@mui/icons-material";

function ButtonsGroup() {
  const iconButtonStyle = {
    fontSize: "10px", 
  };

  return (
    <ButtonGroup aria-label="outlined primary button group">
      <IconButton style={iconButtonStyle}>
        <Edit />
      </IconButton>
      <IconButton style={iconButtonStyle}>
        <Delete />
      </IconButton>
    </ButtonGroup>
  );
}

export default ButtonsGroup;
