import React, { useState, useEffect } from 'react';
import {
  Button,
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
  Typography,
} from '@mui/material';
import axios from 'axios';
import Quiz from './Quiz';
import ResponsiveNavBar from '../../../components/Navbar';

type Category = {
  category: string;
};

interface Flashcard {
  question: string;
  answer: string;
}

type Quiz = {
  id: string;
  title: string;
  flashcards: Flashcard[]
};

const QuizesLayout = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null)
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const generateQuizzes = async () => {
    setLoading(true); 
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated data for demonstration, replace this with actual POST request to '/quizzes'
      const generatedQuizzes = [
        { id: '1', title: 'Quiz 1', flashcards: [{ id: '1', question: 'Question 1', answer: 'Answer 1', difficulty_level: 2 }] },
        { id: '2', title: 'Quiz 2', flashcards: [{ id: '12345', question: 'Question 2', answer: 'Answer 2', difficulty_level: 2 }] },
      ];

      setQuizzes(generatedQuizzes);
    } catch (error) {
      console.error('Error generating quizzes:', error);
    } finally {
      setLoading(false); 
    }
  };

  const startQuiz = (quizIndex: number) => {
    setSelectedQuiz(quizIndex); // Set the selected quiz ID when Start is clicked
<Quiz
  start_time={new Date()}
  id={quizzes[quizIndex].id}
  title={quizzes[quizIndex].title}
  flashcards={quizzes[quizIndex].flashcards}
  onFinish={() => {
    // Define your onFinish function here
  }}
/>  };

  return (
    <>
      <ResponsiveNavBar />
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Choose up to 3 categories
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                {categories.map((category: Category) => (
                  <FormControlLabel
                    key={category.category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category.category)}
                        onChange={(e) => {
                          const { checked } = e.target;
                          const { category: categoryId } = category;
                          if (checked && selectedCategories.length < 3) {
                            setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
                          } else {
                            setSelectedCategories((prevCategories) =>
                              prevCategories.filter((catId: string) => catId !== categoryId)
                            );
                          }
                        }}
                      />
                    }
                    label={category.category}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedCategories.length === 0 || selectedCategories.length > 3 || loading}
              onClick={generateQuizzes}
            >
              Generate Tests
            </Button>
          </Grid>

          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <List>
                {quizzes.map((quiz, index) => (
                  <ListItem key={index} style={{ marginBottom: '1rem' }}>
                    <ListItemText primary={quiz.title} secondary={`Flashcards: ${quiz.flashcards.length}`} />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => startQuiz(index)} // Pass the quiz ID here
                    >
                      Start
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default QuizesLayout;
