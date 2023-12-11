import { Grid, Container, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";

export default function AddCard(props: any) {
  const [difficulty, setDifficulty] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
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
    props.addFlashCard(question, answer, category, difficulty);
    // Optionally, you can clear the form fields here
    setQuestion("");
    setAnswer("");
    setCategory("");
    setDifficulty("");
  };
  // const [selectedNumber, setSelectedNumber] = useState('');

  // const handleChange = (event:any) => {
  //   setSelectedNumber(event.target.value);

  // };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Add A New Card
        </Typography>
        <Box
          component="form"
          noValidate
          //onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ width: "100%", height: "150px" }}>
              <TextField
                required
                fullWidth
                id="Question"
                label="Question"
                name="Question"
                autoComplete="off"
                value={question}
                onChange={handleQuestionChange}
                sx={{
                  "& fieldset": { borderColor: "#6352B1", height: "140px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ width: "100%", height: "170px" }}>
              <TextField
                required
                fullWidth
                name="Answer"
                label="Answer"
                type="Answer"
                id="Answer"
                autoComplete="off"
                value={answer}
                onChange={handleAnswerChange}
                sx={{
                  "& fieldset": { borderColor: "#6352B1", height: "160px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Difficulty Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={difficulty}
                  label="Difficulty Level"
                  onChange={handleDifficultyChange}
                  sx={{ "& fieldset": { borderColor: "#6352B1" } }}
                >
                  <MenuItem value={1}>easy</MenuItem>
                  <MenuItem value={2}>medium</MenuItem>
                  <MenuItem value={3}>hard</MenuItem>
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
                value={category}
                onChange={handleCategoryChange}
                sx={{ "& fieldset": { borderColor: "#6352B1" } }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#6352B1" }}
              onClick={handleAddClick}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              //fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "#6352B1", backgroundColor: "white" }}
            >
              Go Back
            </Button>
          </Grid>

          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </Container>
  );
}
