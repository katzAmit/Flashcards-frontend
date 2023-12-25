import React, { useState } from 'react';
import { Grid, Paper, Container, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AlternativeEvents from './AlternativeEvents';
import PieChart from './PieChart';
import './Time.css';

export default function StatisticLayout(props: any) {
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const headerStyle = {
    fontSize: '1.2em', // Adjust the font size as needed
    borderBottom: '1px solid #000', // Adjust the border thickness and color as needed
    padding: '8px', // Adjust the padding as needed
    marginBottom: '1px', // Adjust the margin as needed
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid container item xs={12} sm={10} md={8} sx={{
          border: '1px solid #ccc',
          padding: 2,
        }}>
          <h2 style={headerStyle}>The Best Hours You Perform Are</h2>
          <div className="costume-font">{props.stat1}</div>
        </Grid>
        <Grid container item xs={12} sm={8} md={4} sx={{
          border: '1px solid #ccc',
          padding: 2,
        }}>
          <h2 style={headerStyle}>Perfected Questions Per Category</h2>
          <AlternativeEvents data={props.stat2} />
        </Grid>
        <Grid container item xs={12} sm={6} md={4} sx={{
          border: '1px solid #ccc',
          padding: 2,
        }}>
          <h2 style={headerStyle}>Flashcards Distribution</h2>
          <PieChart data={props.stat3} />
        </Grid>

        {/* Second Row */}
        <Grid container item xs={12} sm={6} md={4} sx={{
          border: '1px solid #ccc',
          padding: 2,
        }}>
          <h2 style={headerStyle}>Distribution of Difficulty Level</h2>
          <AlternativeEvents data={props.stat4} />
        </Grid>
        <Grid container item xs={12} sm={6} md={4} sx={{
          border: '1px solid #ccc',
          padding: 2,
        }}>
          <h2 style={headerStyle}>The Average Time It Takes You to Finish a Quiz</h2>
          <div className="costume-font">{props.stat5}</div>
        </Grid>
      </Grid>
    </Container>
  );
}
