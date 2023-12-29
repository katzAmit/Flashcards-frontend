import React, { useState } from "react";
import {
  Grid,
  Paper,
  Container,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AlternativeEvents from "./AlternativeEvents";
import PieChart from "./PieChart";
import "./Time.css";

export default function StatisticLayout(props: any) {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const headerStyle = {
    fontSize: "1.2em", // Adjust the font size as needed
    borderBottom: "1px solid #000", // Adjust the border thickness and color as needed
    // Adjust the padding as needed
    marginBottom: "1px", // Adjust the margin as needed
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid
          container
          item
          xs={12}
          sm={9}
          md={7}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
          }}
        >
          <h2 style={headerStyle}>Perfected Questions Per Category</h2>
          <AlternativeEvents data={props.stat2} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={7}
          md={5}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
          }}
        >
          <h2 style={headerStyle}>Flashcards Distribution per Category</h2>
          <PieChart data={props.stat3} />
        </Grid>

        {/* Second Row */}
        <Grid
          container
          item
          xs={12}
          sm={9}
          md={7}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
          }}
        >
          <h2 style={headerStyle}>Distribution of Difficulty Level</h2>
          <AlternativeEvents data={props.stat4} />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={7}
          md={5}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
          }}
        >
          <h2 style={{ ...headerStyle, marginBottom: "0.5em" }}>
            The Best Hours You Perform Are
          </h2>
          <div className="costume-font" style={{ marginBottom: "0.5em" }}>
            {props.stat1}
          </div>
          <h2
            style={{
              ...headerStyle,
              marginTop: "0.5em",
              marginBottom: "0.5em",
            }}
          >
            The Average Time It Takes You to Finish a Quiz
          </h2>
          <div style={{ marginTop: "0.5em", marginBottom: "0.5em" }}>
            <div className="costume-font" style={{ marginBottom: "0.5em" }}>
              {props.stat5}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
