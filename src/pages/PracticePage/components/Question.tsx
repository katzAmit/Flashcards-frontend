import * as React from "react";
import Typography from "@mui/material/Typography";

interface QuestionProps{
    question: string;
    answer: string;
    isRevealed: boolean;
}


const Question: React.FC<QuestionProps> = (props) => {

    return(

        <Typography
          className="contentObj"
          gutterBottom
          variant="h3"
          component="h1"
        >
          {props.question}
        </Typography>


    );
}

export default Question;