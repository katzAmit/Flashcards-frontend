import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import StyleIcon from "@mui/icons-material/Style";
import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutesEnum } from "../types/routes.enum";
const pages = ["Home", "Practice", "Marathon", "Statistics"];
const navto: Record<string, RoutesEnum> = {
  Home: RoutesEnum.HOME,
  Practice: RoutesEnum.PRACTICE,
  Statistics: RoutesEnum.STATS,
  Marathon: RoutesEnum.MARATHON,
};
function ResponsiveNavBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();
  const { setToken } = useAuth();
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event);
  };
  const navigate = useNavigate();
  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    handleNav(page);
  };
  const handleLogout = () => {
    setToken("delete");
    navigate(RoutesEnum.LOGIN);
  };
  const handleNav = (page: string) => {
    console.log(`about to navigate to ${navto}`);
    navigate(navto[page]);
  };
  return (
    <AppBar
      position="static"
      sx={{ height: "68px", backgroundColor: "#6352B1" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyleIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Flashcards
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-NavBar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-NavBar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                marginTop: "30px",
              }}
            >
              {pages.map((page: string) => (
                <MenuItem key={page} onClick={() => handleNav(page)}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontSize: "1rem",
                      "&:hover": {
                        backgroundColor: "rgba(102, 68, 166, 0.1)",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <StyleIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Flashcards
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: string) => (
              <Button
                onClick={() => handleNav(page)}
                key={page}
                sx={{
                  my: 2,
                  color:
                    location.pathname === navto[page]
                      ? "white"
                      : "rgba(255, 255, 255, 0.6)",
                  display: "block",
                  fontSize: "1rem",
                  padding: "10px", // Add padding for better visual appearance
                  borderRadius: "8px", // Add rounded corners
                  transition: "background-color 0.3s, color 0.3s", // Smooth transition on hover for color and background
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Background color on hover for all tabs
                    color: "rgba(255, 255, 255, 0.8)", // Change text color on hover for better contrast
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <div style={{ position: "absolute", right: 20 }}>
            <Button
              onClick={handleLogout}
              sx={{
                my: 2,
                color: "rgba(255, 255, 255, 0.6)",
                display: "block",
                fontSize: "1rem",
                padding: "10px", // Add padding for better visual appearance
                borderRadius: "8px", // Add rounded corners
                transition: "background-color 0.3s, color 0.3s", // Smooth transition on hover for color and background
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Background color on hover for all tabs
                  color: "rgba(255, 255, 255, 0.8)", // Change text color on hover for better contrast
                },
              }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveNavBar;
