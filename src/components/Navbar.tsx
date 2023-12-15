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
  import { useAuth } from '../auth/AuthProvider';
  import { useNavigate } from "react-router-dom";
  import { RoutesEnum } from "../types/routes.enum";
  const pages = ["Home", "Practice", "Statistics", "Marathon"];

  function ResponsiveNavBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { setToken } = useAuth();
    const handleOpenNavMenu = (event: any) => {
      setAnchorElNav(event);
    };
    const navigate = useNavigate();
    const handleCloseNavMenu = (page: string) => {
      setAnchorElNav(null);
      handleNav(page)
    };
    const handleLogout = () => {
      setToken('delete');
      navigate(RoutesEnum.LOGIN)
    };
    const handleNav = (page: string) => {
      const navto: Record<string, RoutesEnum> = {"Home": RoutesEnum.HOME, "Practice": RoutesEnum.PRACTICE, "Statistics": RoutesEnum.STATS, "Marathon": RoutesEnum.MARATHON}
      console.log(`about to navigate to ${navto[page]}`)
      navigate(navto[page])
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
              href="#app-bar-with-responsive-menu"
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
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page: string) => (
            <MenuItem key={page}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
            </Box>
            <StyleIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
      key={page}
      sx={{ my: 2, color: "white", display: "block" }}
      onClick={() => handleNav(page)} // Add onClick handler
    >
      {page}
    </Button>
  ))}
</Box>
            <div style={{ position: "absolute", right: 20 }}>
              <Typography variant="h6" color="inherit" noWrap>
                <Button sx={{ my: 2, color: "white", display: "block" }} onClick={handleLogout}>
                  Logout
                </Button>
              </Typography>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  export default ResponsiveNavBar;
