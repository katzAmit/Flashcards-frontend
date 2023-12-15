import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, InputLabel, FormControl, Select, Typography, Container, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";

export default function AddCard(props: any) {
  const [difficulty, setDifficulty] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    setDifficulty(event.target.value);
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleAddClick = () => {
    const errors: string[] = [];
    if (!question) errors.push("Question");
    if (!answer) errors.push("Answer");
    if (!category) errors.push("Category");
    if (!difficulty) errors.push("Difficulty");

    setErrorFields(errors);

    if (errors.length > 0) return;

    props.setAnchor(null);
    props.addFlashCard(question, answer, category, difficulty);
    // Optionally, you can clear the form fields here
    setQuestion("");
    setAnswer("");
    setCategory("");
    setDifficulty("");
    setOpen(false);
  };

  const isErrorField = (field: string) => errorFields.includes(field);

  return (
    <Dialog open={props.anchor !== null} onClose={() => props.setAnchor(null)}>
      
      <DialogContent>
        <Container component="main" maxWidth="sm">
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" fontWeight="bold" style={{ marginBottom: "1.5rem" }}>Add Card</Typography>
            <form noValidate style={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Question"
                    label="Question"
                    name="Question"
                    autoComplete="off"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={question}
                    onChange={handleQuestionChange}
                    error={isErrorField("Question")}
                    helperText={isErrorField("Question") ? "Please enter a question" : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Answer"
                    label="Answer"
                    type="Answer"
                    id="Answer"
                    autoComplete="off"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={answer}
                    onChange={handleAnswerChange}
                    error={isErrorField("Answer")}
                    helperText={isErrorField("Answer") ? "Please enter an answer" : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Difficulty Level</InputLabel>
                    <Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={difficulty}
  onChange={handleDifficultyChange} // Include this line to handle difficulty changes
  label="Difficulty Level"
  variant="outlined"
  error={isErrorField("Difficulty")}
>
  <MenuItem value={"Easy"}>Easy</MenuItem>
  <MenuItem value={"Medium"}>Medium</MenuItem>
  <MenuItem value={"Hard"}>Hard</MenuItem>
</Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Category"
                    label="Category"
                    name="Category"
                    autoComplete="Category"
                    variant="outlined"
                    value={category}
                    onChange={handleCategoryChange}
                    error={isErrorField("Category")}
                    helperText={isErrorField("Category") ? "Please enter a category" : ""}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAddClick}>Add Card</Button>
        <Button variant="contained" color="primary" onClick={() => props.setAnchor(null)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}