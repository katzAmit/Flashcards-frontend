import * as React from "react";
import {
  AppBar,Button,Card,CardActions,CardContent,CssBaseline,Grid,Stack,Box,Toolbar,
  Typography,Container,Link,createTheme,ThemeProvider,} from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Footer from  "./components/Footer.jsx";
import UpperBar from "./components/UpperBar.jsx";
import SideBar from "./components/SideBar.jsx";
import MainHeader from "./components/MainHeader.jsx";





const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const options = ['names', 'italy'];

export default function Album() {
  return (
    // 31-55
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <UpperBar />
      <SideBar />
    
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
      
            <MainHeader />
            
            {/* <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography> */}

            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <select style={{ height: "50px", fontSize: "16px" }}>
              <option value="">Choose category</option>
              {options.map((option) => (
                <option value={option}>
                  {option}
                </option>
  ))}

              </select>
              
              {/* <select style={{ height: "50px", fontSize: "16px" }}>
                <option value="">Choose category</option>
                <option value="names">Names</option>
                <option value="italy">Italy</option>
              </select> */}
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={12} md={12}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                  }}
                >
                  {/* <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <NoteAltIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
