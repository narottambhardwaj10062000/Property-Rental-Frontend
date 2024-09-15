import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoginForm  from "./pages/Login";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#bdbdbd",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={myTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
