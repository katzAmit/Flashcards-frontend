import React, { useState } from 'react';
import { Grid, Paper, Container, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AlternativeEvents from './AlternativeEvents';
import PieChart from './PieChart';
import TimeTable from './TimeTable';
import './Time.css';

export default function StatisticLayout(props: any) {

    const [category, setCategory] = useState("");

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value);
      };
      
    
    
    return(
        <Container  sx={{ py: 8 }} maxWidth="lg">
            <Grid container spacing={2}>
      {/* First Row */}
      <Grid item xs={12} sm={10} md={8}>
        <Paper>the best hours you preform are:</Paper>
            <div className="costume-font"> {props.stat1}</div>  
      </Grid>
      <Grid item xs={12} sm={8} md={4}>
      <Paper>perfected questions per category </Paper>
      <AlternativeEvents data= {props.stat2}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <Paper>lflashcards distribution</Paper>
        <PieChart data={props.stat3}/>
      </Grid>  

      {/* Second Row */}

      <Grid item xs={12} sm={6} md={4}>
        <Paper>average time per difficulty level</Paper>
        <TimeTable />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper>the average time it takes you
             to finish a quiz is:</Paper>
             <div className="costume-font"> {props.stat5}</div>
      </Grid>
      
      {/* <Grid item xs={4}>
        <Paper>Content 5</Paper>
        <AlternativeEvents />
      </Grid>
      <Grid item xs={4}>
        <Paper>Content 6</Paper>
        <AlternativeEvents />
      </Grid> */}
            </Grid>
        </Container>


    );
}
