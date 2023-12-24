import React, { useEffect, useState } from "react";
import { MarathonType } from "../../../types/card.interface";
import axios from "axios";
import {
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Quiz from "../../PracticePage/Quiz";
import { RoutesEnum } from "../../../types/routes.enum";

type CurrentMarathonsLayoutProps = {};

const CurrentMarathonsLayout: React.FC<CurrentMarathonsLayoutProps> = ({}) => {
  const navigate = useNavigate();
  const [marathons, setMarathons] = useState<MarathonType[]>([]);
  const [categories, setCategories] = useState<
    { username: string; category: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number | undefined>(
    undefined
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [quizDoneStatus, setQuizDoneStatus] = useState<boolean[]>([]);
  const [selectedMarathon, setSelectedMarathon] = useState<MarathonType | any>(
    null
  ); // Track the selected marathon

  useEffect(() => {
    fetchCategories();
    fetchMarathons();
  }, []);

  const fetchMarathons = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/marathon`);
      setMarathons(res.data);
    } catch (error) {
      console.error("error fetching marathons", error);
      setMarathons([]);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };
  const handleContinueMarathon = async (marathonId: string, index: number) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/current_marathon_quiz",
        {
          marathon_id: marathonId,
        }
      );
      const currentQuizData = response.data;
      if (currentQuizData && currentQuizData.did_quiz === 0) {
        setSelectedMarathon({ ...marathons[index], currentQuizData }); // Store the selected marathon with its quiz data
      } else {
        const updatedStatus = [...quizDoneStatus];
        updatedStatus[index] = true;
        setQuizDoneStatus(updatedStatus);
      }
    } catch (error) {
      console.error("Error fetching current quiz:", error);
    }
  };
  const createMarathon = async (
    selectedCategory: string | undefined,
    selectedDays: number | undefined
  ) => {
    if (!selectedCategory || !selectedDays) {
      console.error("Please select a category and specify the number of days.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/marathon", {
        category: selectedCategory,
        total_days: selectedDays,
      });

      const marathon_id = response.data;
      const newMarathon: MarathonType = {
        marathon_id,
        category: selectedCategory,
        total_days: selectedDays,
        current_day: 0,
      };

      // Fetch updated marathons after creating a new one
      await fetchMarathons();
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error adding marathon", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem" }}>
      {!selectedMarathon || !selectedMarathon.currentQuizData ? (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="left"
              sx={{ fontWeight: "lighter", color: "#333" }}
            >
              Choose a Category and Number of Days to Start a Marathon
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as string)}
                displayEmpty
                inputProps={{ "aria-label": "Select category" }}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.category} value={category.category}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Number of Days"
              variant="outlined"
              value={selectedDays || ""}
              onChange={(e) => setSelectedDays(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!selectedCategory || !selectedDays}
              sx={{ backgroundColor: "#2E3B55" }}
              onClick={() => createMarathon(selectedCategory, selectedDays)}
            >
              <Typography sx={{ fontWeight: "lighter", color: "#FFFFFF" }}>
                Start Marathon
              </Typography>
            </Button>
            {showSuccessMessage && (
              <Typography variant="body2" sx={{ marginTop: 1, color: "green" }}>
                New marathon added successfully!
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            {marathons.length > 0 ? (
              marathons.map((marathon: MarathonType, index: number) => (
                <div
                  key={marathon.marathon_id}
                  style={{
                    backgroundColor: "#2E3B55",
                    color: "#FFFFFF",
                    padding: "2rem",
                    borderRadius: "15px",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
                    textAlign: "start",
                    marginTop: "20px",
                    position: "relative",
                  }}
                >
                  <h5
                    style={{
                      color: "white",
                      marginBottom: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                    }}
                  >
                    {`${marathon.category} Marathon`}
                  </h5>
                  <p style={{ color: "white" }}>
                    📅{" "}
                    {`Day ${marathon.current_day + 1} out of ${
                      marathon.total_days
                    }`}
                  </p>
                  {quizDoneStatus[index] ? (
                    <div style={{ color: "red", marginBottom: "1rem" }}>
                      All done for today, come back tomorrow
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleContinueMarathon(marathon.marathon_id, index)
                      }
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
                      Continue Marathon
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <Typography>No active marathons</Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <Quiz
          flashcards={selectedMarathon.currentQuizData.flashcards}
          title={`Quiz ${selectedMarathon.current_day + 1}`}
          id={selectedMarathon.currentQuizData.id}
          start_time={selectedMarathon.currentQuizData.start_time}
          onFinish={() => {
            navigate(RoutesEnum.MARATHON);
            setSelectedMarathon([]);
          }}
          marathon_or_practice="marathon"
          marathon_id={selectedMarathon.marathon_id}
        />
      )}
    </Container>
  );
};

export default CurrentMarathonsLayout;
