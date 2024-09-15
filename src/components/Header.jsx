import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Stack,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("token");

    if(result) {
        setIsAuthenticated(true);
    }
    else {
        setIsAuthenticated(false);
    }
  }, [])

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (type) => {
    if( type === "login") {
      navigate("/login", { state: { formType: "login" } })
    }
    else{
      navigate("/login", { state: { formType: "signUp" } })
    }
    setAnchorEl(null);
  };

  // Logout Handler

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    alert("Logged Out Successfully");
  }

  return (
    <AppBar position="static">
      <Container maxWidth="lg" disableGutters sx={{px: { xs: 2, sm: 4, lg: 0}}}>
        <Toolbar disableGutters>
          {/* Logo and Home Buttons */}

          <Stack direction="row" spacing={4} sx={{ flexGrow: 1 }}>
            {/* Logo */}

            <Typography variant="h4" fontWeight={700}>
              LOGO
            </Typography>

            {/* Home Button */}

            <Button
              sx={{
                color: "#fff",
                color: (theme) => theme.palette.common.black,
                fontSize: "16px",
                fontWeight: 500,
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
            >
              Home
            </Button>
          </Stack>

          {/* Buttons ( Login and SignUp ) */}

          {!isMobile && (
            <>
            <Stack direction="row" spacing={2} sx={{ display: !isAuthenticated ? "flex" : "none" }}>
              {/* Login */}

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#AFDCEA",
                  borderRadius: "14px",
                  fontWeight: "600",
                }}
                disableElevation
                size="large"
                onClick={() => navigate("/login", { state: { formType: "login" } })}
              >
                Login
              </Button>

              {/* SignUp */}

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#D7EEF6",
                  borderRadius: "14px",
                  fontWeight: "600",
                }}
                disableElevation
                size="large"
                onClick={() => navigate("/login", { state: { formType: "signUp" } })}
              >
                SignUp
              </Button>
            </Stack>

            {/* Logout Button */}

            <Button
                variant="contained"
                sx={{
                  bgcolor: "#D7EEF6",
                  borderRadius: "14px",
                  fontWeight: "600",
                  display: isAuthenticated ? "flex" : "none"
                }}
                disableElevation
                size="large"
                onClick={handleLogout}
              >
                Logout
              </Button>
              </>
          )}

          

          {/* For Mobile Devices */}

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Menu */}

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem onClick={() => handleMenuClose("login")} sx={{ display: !isAuthenticated ? "flex" : "none" }}>Login</MenuItem>
            <MenuItem onClick={() => handleMenuClose("signUp")} sx={{ display: !isAuthenticated ? "flex" : "none" }}>SignUp</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ display: isAuthenticated ? "flex" : "none" }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
