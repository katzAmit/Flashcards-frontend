import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import UpperBar from "../LoginPage/components/LoginBar";
import { RoutesEnum } from "../../types/routes.enum";
import { useState } from "react";

const defaultTheme = createTheme();

let incorrectMail = false;

let usedMail = false;
let errorMessage = "";

function MailIncorrectness(email: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
}

function PasswordIncorrectness(password: any) {
  // Password must be at least 8 characters long
  const minLength = 8;

  // Regular expressions to check for different character types
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Check if the password meets all criteria
  const isStrongPassword =
    password.length >= minLength &&
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password) &&
    specialCharRegex.test(password);

  return !isStrongPassword;
}

export default function SignUp() {
  const [weakPassword, setWeakPassword] = useState(false); // State for weakPassword
  function CheckValidation(userData: any) {
    MailIncorrectness(userData["username"])
      ? (incorrectMail = true)
      : PasswordIncorrectness(userData["password"])
      ? setWeakPassword(true)
      : axios
          .post("http://localhost:4000/register", userData)
          .then((response) => {
            navigate("/");
          })
          .catch((error) => {
            usedMail = true;
            errorMessage = error.response.data.error;
            navigate(RoutesEnum.REGISTER);
          });
  }

  const handleSignInClick = () => {
    navigate("/");
  };
  const handleSubmit = (event: any) => {
    incorrectMail = false;
    setWeakPassword(false);
    usedMail = false;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      username: data.get("email"),
      password: data.get("password"),
      fname: data.get("fname"),
      lname: data.get("lname"),
    };
    CheckValidation(dataToSend);

    navigate(RoutesEnum.REGISTER);
  };

  const navigate = useNavigate();

  return (
    <>
      <UpperBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#6352B1" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  sx={{ "& fieldset": { borderColor: "#6352B1" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  sx={{ "& fieldset": { borderColor: "#6352B1" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ "& fieldset": { borderColor: "#6352B1" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={{ "& fieldset": { borderColor: "#6352B1" } }}
                />
              </Grid>
            </Grid>

            <div>
              {!incorrectMail && !weakPassword && !usedMail ? null : (
                <Box
                  style={{
                    border: "2px solid red",
                    borderRadius: "10px",
                    marginTop: "20px",
                    width: "fullWidth",
                    padding: "10px",
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <ErrorOutlineIcon />{" "}
                  {incorrectMail ? (
                    <p>Invalid email address</p>
                  ) : weakPassword ? (
                    <p>
                      Weak password!
                      <br />
                      Ensure it's at least 8 characters long with a mix of
                      uppercase, lowercase letters, digits, and special
                      characters.
                    </p>
                  ) : (
                    <p>{errorMessage}</p>
                  )}
                </Box>
              )}
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#6352B1" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <button
                  onClick={handleSignInClick}
                  style={{
                    color: "#6352B1",
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Already have an account? Sign in
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
