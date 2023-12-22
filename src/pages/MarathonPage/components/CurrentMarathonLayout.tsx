import React, { useEffect, useState } from "react";
import { MarathonType } from "../../../types/card.interface";
import { Marathon } from "./Marathon";
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

type CurrentMarathonsLayoutProps = {};

const CurrentMarathonsLayout: React.FC<CurrentMarathonsLayoutProps> = ({}) => {
  const [marathons, setMarathons] = useState<MarathonType[]>([]);
  const [categories, setCategories] = useState<
    { username: string; category: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<number | undefined>(
    undefined
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [continueMarathonClicked, setContinueMarathonClicked] =
    useState<boolean>(false);

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

  const createMarathon = async (
    selectedCategory: string | undefined,
    selectedDays: number | undefined
  ) => {
    if (!selectedCategory || !selectedDays) {
      console.error("Please select a category and specify the number of days.");
      return;
    }

    try {
      // Create the new marathon and update state
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

      setMarathons((prevMarathons) =>
        prevMarathons ? [newMarathon, ...prevMarathons] : [newMarathon]
      );
      setShowSuccessMessage(true);

      // Fetch updated marathons
      // await fetchMarathons();
    } catch (error) {
      console.error("Error adding marathon", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "2rem" }}>
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
            marathons.map((marathon: MarathonType) => (
              <Marathon
                key={marathon.marathon_id}
                marathon_id={marathon.marathon_id}
                category={marathon.category}
                total_days={marathon.total_days}
                current_day={marathon.current_day}
              />
            ))
          ) : (
            <Typography>No active marathons</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CurrentMarathonsLayout;
