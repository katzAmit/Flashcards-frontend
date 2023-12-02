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
import CategorySelector from "./components/CategorySelector.jsx";
import GeneralCard from "./components/GeneralCard.jsx";
import CardsLayout from "./components/CardsLayout.jsx";





// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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

            <CategorySelector />
              
              
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

        <CardsLayout />

      </main>
      {/* Footer */}
      
        <Footer />
      
      {/* End footer */}
    </ThemeProvider>
  );
}
