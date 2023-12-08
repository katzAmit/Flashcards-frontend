import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UpperBar from '../LoginPage/components/UpperBar';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


let incorrectMail = false;
let weakPassword = false;
let usedMail = false;
let errorMessage = "";


function MailIncorrectness(email: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
}

function PasswordIncorrectness(password: any) {
  return false;
}

export default function SignUp() {

  function CheckValidation(userData: any) {
    (MailIncorrectness(userData['username']))? incorrectMail = true :
    (PasswordIncorrectness(userData['password']))? weakPassword = true :
    axios.post("http://localhost:4000/register" ,userData).then((response) => {
      navigate('/')}).catch((error) =>
      {usedMail = true;
        errorMessage = error.response.data.error;
      navigate('/signup');})
  }

  const handleSignInClick= ()=>{
    navigate('/');
  }
  const handleSubmit = (event: any) => {

    incorrectMail = false;
    weakPassword = false;
    usedMail = false;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {username: data.get('email'), password: data.get('password'),
    fName: data.get('firstName'), lName: data.get('lastName')};
    CheckValidation(dataToSend);

    navigate('/signup');
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <UpperBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#6352B1" }}>
            <LockOutlinedIcon />
          </Avatar >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  sx={{ '& fieldset': { borderColor: '#6352B1' } }}
            
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{ '& fieldset': { borderColor: '#6352B1' } }}
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
                  sx={{ '& fieldset': { borderColor: '#6352B1' } }}
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
                  sx={{ '& fieldset': { borderColor: '#6352B1' } }}
                />
              </Grid>
             
            </Grid>

            <div>
            {
              (!incorrectMail && !weakPassword && !usedMail)? null :
              <Box style={{border: '2px solid red', borderRadius: '10px', marginTop:'20px',
              width: 'fullWidth', height: '50px', padding: '10px', color: 'red',
              display: 'flex',justifyContent: 'center'}}> 
              <ErrorOutlineIcon />  {incorrectMail? <p>invalid email address</p>:
              weakPassword? <p>your password is too weak</p>:
              <p>{errorMessage}</p>}</Box> 
            }
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
              <button onClick={handleSignInClick} style={{
                  color: '#6352B1',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                 Already have an account? Sign in
                  </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}