// GeneralCard.jsx
import * as React from "react";
import Typography from "@mui/material/Typography";
import "./GeneralCard.css";

function GeneralCard(props) {
  const { isFlipped } = props;

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`}>
      <div className="card__face card__face--front">
        <Typography gutterBottom variant="h3" component="h1">
          {props.question}
        </Typography>
      </div>
      <div className="card__face card__face--back">
        <Typography variant="h3">{props.answer}</Typography>
      </div>
    </div>
  );
}

export default GeneralCard;
