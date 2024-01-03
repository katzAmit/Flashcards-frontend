import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import Quiz from "./Quiz";
import ResponsiveNavBar from "../../../components/Navbar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { RoutesEnum } from "../../../types/routes.enum";
import { useNavigate } from "react-router-dom";

type Category = {
  category: string;
};

interface Flashcard {
  question: string;
  answer: string;
  difficulty_level: string;
}

type QuizType = {
  id: string;
  title: string;
  flashcards: Flashcard[];
  difficulty_levels: string[];
  categories: string[];
};

const QuizesLayout = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState<
    number | undefined
  >();
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFinishQuiz = () => {
    if (selectedQuiz !== null) {
      const updatedQuizzes = [...quizzes];
      updatedQuizzes.splice(selectedQuiz, 1); // Remove the submitted quiz from the list
      setQuizzes(updatedQuizzes); // Update the quizzes state without the submitted quiz
      setSelectedQuiz(null);
      navigate(RoutesEnum.PRACTICE);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "#4CAF50"; // Green for Easy
      case "Medium":
        return "#FFC107"; // Yellow for Medium
      case "Hard":
        return "#F44336"; // Red for Hard
      case "Easy-Medium":
        return "linear-gradient(90deg, #4CAF50, #FFC107)"; // Gradient for Easy-Medium
      case "Medium-Hard":
        return "linear-gradient(90deg, #FFC107, #F44336)"; // Gradient for Medium-Hard
      default:
        return "#9E9E9E"; // Grey for other levels
    }
  };
  const [error, setError] = useState(""); // State to hold error message

  const handleCloseError = () => {
    setError("");
  };

  const generateQuizzes = async (categoriesToSend: string[]) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post("http://localhost:4000/quizzes", {
        categories: categoriesToSend,
        selectedNumberOfQuestionsPerQuiz: selectedNumberOfQuestions,
      });

      const quizzesData = response.data;
      // AADD A PROMPYT FOR HOW MANY QUIZES
      setQuizzes(quizzesData);
    } catch (error: any) {
      console.error("Error fetching quizzes:", error);
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error); // Set specific error message for 400 status
        setQuizzes([]); // Clear quizzes data when encountering an error
      } else {
        setError("Failed to generate quizzes"); // Use a generic message for other errors
      }
    } finally {
      setLoading(false);
    }
  };
  const startQuiz = (quizIndex: number) => {
    setSelectedQuiz(quizIndex);
  };

  return (
    <>
      <ResponsiveNavBar />
      <Container maxWidth="md" style={{ paddingTop: "2rem", height: "100vh" }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {selectedQuiz === null ? (
            <>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="left"
                  sx={{
                    marginBottom: "1rem",
                    fontWeight: "lighter",
                    color: "#333",
                  }}
                >
                  <div className="font-bold text-xl">
                    Choose up to 3 categories to be tested on!
                  </div>
                </Typography>
                <Snackbar
                  open={error !== ""}
                  autoHideDuration={6000}
                  onClose={handleCloseError}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseError}
                    severity="error"
                  >
                    {error}
                  </MuiAlert>
                </Snackbar>
                <FormControl component="fieldset">
                  <Grid container spacing={2}>
                    {categories.map((category: Category) => (
                      <Grid
                        key={category.category}
                        item
                        xs={6}
                        sm={3}
                        md={3}
                        lg={3}
                        style={{ width: "300px" }} 
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCategories.includes(
                                category.category
                              )}
                              onChange={(e) => {
                                const { checked } = e.target;
                                const { category: categoryId } = category;
                                if (checked && selectedCategories.length < 3) {
                                  setSelectedCategories((prevCategories) => [
                                    ...prevCategories,
                                    categoryId,
                                  ]);
                                } else {
                                  setSelectedCategories((prevCategories) =>
                                    prevCategories.filter(
                                      (catId: string) => catId !== categoryId
                                    )
                                  );
                                }
                              }}
                            />
                          }
                          label={
                            <Typography // Adjust the variant as needed
                              variant="body1"
                              sx={{
                                fontWeight: "lighter",

                                color: "#333",
                              }}
                            >
                              {category.category}
                            </Typography>
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={5} className="mb-4">
                  <Tooltip
                    title="This field is optional. Leaving it unfilled will generate quizzes with 3 flashcards per quiz, the minimum for a category."
                    arrow
                  >
                    <TextField
                      fullWidth
                      type="number"
                      label="Select Number of Flashcards Per Quiz"
                      variant="outlined"
                      value={selectedNumberOfQuestions || ""}
                      onChange={(e) => {
                        const questions = parseInt(e.target.value);
                        setSelectedNumberOfQuestions(
                          questions > 3 || e.target.value === "" ? questions : 3
                        );
                      }}
                    />
                  </Tooltip>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    selectedCategories.length === 0 ||
                    selectedCategories.length > 3 ||
                    loading
                  }
                  sx={{ backgroundColor: "#2E3B55" }}
                  onClick={() => generateQuizzes(selectedCategories)}
                >
                  <Typography
                    sx={{
                      fontWeight: "lighter",
                      color: "#FFFFFF",
                    }}
                  >
                    Generate Quizzes
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={12}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <List>
                    {quizzes.map((quiz, index) => (
                      <Card
                        key={index}
                        style={{
                          marginBottom: "1rem",
                          backgroundColor: "#2E3B55",
                          color: "#FFFFFF",
                          position: "relative", // Adding relative positioning
                        }}
                      >
                        <CardContent>
                          <Typography sx={{}} variant="h6" gutterBottom>
                            {quiz.title}
                          </Typography>
                          <Typography sx={{}} variant="body2">
                            Flashcards: {quiz.flashcards.length}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "0.5rem",
                            }}
                          >
                            <Typography sx={{}} variant="body2">
                              Categories: {quiz.categories.join(", ")}
                            </Typography>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {quiz.difficulty_levels.map((level, i) => (
                                  <Tooltip key={i} title={level} arrow>
                                    <span
                                      style={{
                                        backgroundColor:
                                          getDifficultyColor(level),
                                        width: "16px",
                                        height: "16px",
                                        borderRadius: "50%",
                                        marginRight:
                                          i !==
                                          quiz.difficulty_levels.length - 1
                                            ? "4px"
                                            : "0",
                                      }}
                                    />
                                  </Tooltip>
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => startQuiz(index)}
                            sx={{
                              position: "absolute",
                              bottom: "8px",
                              right: "8px",
                              fontWeight: "bold",
                              backgroundColor: "#2E3B55",
                              color: "#FFFFFF",
                              "&:hover": {
                                backgroundColor: "#1c2733",
                              },
                            }}
                          >
                            Start
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                )}
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Quiz
                start_time={new Date()}
                id={quizzes[selectedQuiz].id}
                title={quizzes[selectedQuiz].title}
                flashcards={quizzes[selectedQuiz].flashcards}
                onFinish={handleFinishQuiz}
                marathon_or_practice="practice"
                marathon_id={`0`}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default QuizesLayout;
