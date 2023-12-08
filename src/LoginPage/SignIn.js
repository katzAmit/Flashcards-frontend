import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpperBar from './components/UpperBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
//import express from express;


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Katz Amit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
let wrongPassword = false;


export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
  const data = new FormData(event.currentTarget);
  const userData = {
    username: data.get('email'),
    password: data.get('password'),
  };

  
  

    axios.post("http://localhost:4000/login", userData).then((response) => {
      console.log(response.status, response.data.token);
      navigate('/homePage');
    })
    .catch((error)=> {
      wrongPassword = true;
      navigate('/');
    }
    );
  };

  const navigate = useNavigate();

  //adds /signup to route
const handleSignupClick = () => {
  wrongPassword = false;
  navigate('/SignUp');
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <UpperBar />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("/studying2.avif")`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1,   backgroundColor: "#6352B1"}} >
              <LockOutlinedIcon />
            </Avatar >
            <Typography component="h1" variant="h5" >
              Sign in
            </Typography>

            <div>
            {wrongPassword? (
              <Box style={{border: '2px solid red', borderRadius: '10px',
              width: '200px', height: '50px', padding: '10px', color: 'red',
              display: 'flex',justifyContent: 'center'}}> 
              <ErrorOutlineIcon />   incorrect password</Box> 
              ): null
            }

            </div>
            
            

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 , backgroundColor: "#6352B1"}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                <button onClick={handleSignupClick} style={{
                  color: '#6352B1',
                  background: 'none',
                  border: 'none',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                  Don't have an account? Sign Up
                  </button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}