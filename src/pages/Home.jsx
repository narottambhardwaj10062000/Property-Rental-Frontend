import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Button,
  Box,
  Select,
  MenuItem,
  Slider,
  TextField,
} from "@mui/material";
import PropertyCard from "../components/PropertyCard";
import { styled } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getPropertyList } from "../apis/property";

// Styled Select Component

const StyledSelect = styled(Select)(({ theme }) => ({
  border: "none", 
  paddingLeft: 0, 
  paddingTop: 0,
  paddingBottom: 0,

  "& fieldset": {
    border: "none", 
  },
  "&:hover fieldset": {
    border: "none", 
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none", 
  },
  "& .MuiSelect-icon": {
    display: "none", 
  },
  "& .MuiSelect-select": {
    paddingLeft: 0, 
    paddingTop: 0,
    paddingBottom: 0,
    fontWeight: "bold", 
    fontSize: "1.2rem", 
  },
}));

// Custom Slider Component

const CustomSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    color: "#7B7DEC", // Change the color of the thumb (use any color you want)
  },
  "& .MuiSlider-track": {
    color: "#7B7DEC", // Selected area (track) color
  },
  //   '& .MuiSlider-rail': {
  //     color: '#d3d3d3', // Unselected area (rail) color
  //   },
}));

// Override padding for DatePicker container
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiStack-root": {
    paddingTop: 0, 
  },
}));

// Custom TextField

const CustomTextField = styled(TextField)({
  overflow: "hidden",
  "& .MuiOutlinedInput-root": {
    "& input": {
      padding: 0, // Set padding to 0
    },

    "& fieldset": {
      border: "none", // Remove the border
    },
  },
});

const Home = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(priceRange);

  // Get Property List Handler

  const handleGetAllProperties = async () => {
    const filters = {
        city: selectedCity,
        propertyType: selectedPropertyType,
        price: priceRange.join("-"),
        availableFrom: selectedDate ? selectedDate.toISOString().split('T')[0] : "",
      };

    const response = await getPropertyList(filters);
    console.log(response);
  
    if( response?.status === 200) {
      setPropertyList(response?.data?.properties)
    }
  };

  // Fetch all properties

  useEffect(() => {
    handleGetAllProperties();
  }, [selectedCity, selectedPropertyType, priceRange, selectedDate]);

  return (
    <>
      <Header />

      {/* Main Container */}

      <Container
        maxWidth="lg"
        disableGutters
        sx={{ px: { xs: "16px", sm: "22px", lg: 0 } }}
      >
        {/* Title */}

        <Typography variant="h4" fontWeight={700} sx={{ my: 6 }}>
          Search Properties for Rent
        </Typography>

        {/* Filter Section */}

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            py: 2,
            px: 2,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* City */}

            <Grid item xs={12} sm={6} md={2}>
              {/* , borderRight: { xs: "none", md: "5px solid #686868" } */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "16px",
                    color: (theme) => theme.palette.grey[700],
                    mb: 1,
                  }}
                >
                  City
                </Typography>

                {/* Select City Dropdown */}

                <StyledSelect
                  value={selectedCity}
                  onChange={(event) => setSelectedCity(event.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without border" }}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Select Location
                  </MenuItem>
                  <MenuItem value="delhi">Delhi</MenuItem>
                  <MenuItem value="mumbai">Mumbai</MenuItem>
                  <MenuItem value="bangalore">Bangalore</MenuItem>
                  <MenuItem value="pune">Pune</MenuItem>
                  <MenuItem value="kolkata">Kolkata</MenuItem>
                </StyledSelect>
              </Box>
            </Grid>

            {/* Available from */}

            <Grid item xs={12} sm={6} md={2.4}>
              {/* , borderRight: { xs: "none", md: "5px solid #686868" } */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "16px",
                    color: (theme) => theme.palette.grey[700],
                  }}
                >
                  Available from
                </Typography>

                {/* Select Move-in Date */}

                <DemoContainer components={["DatePicker"]}>
                  <CustomDatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slots={{ textField: CustomTextField }} // Use the styled TextField
                  />
                </DemoContainer>
              </Box>
            </Grid>

            {/* Price */}

            <Grid item xs={12} sm={6} md={2.4}>
              {/* , borderRight: { xs: "none", md: "5px solid #686868" }  */}
              <Box sx={{ display: "flex", flexDirection: "column", pr: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "16px",
                    color: (theme) => theme.palette.grey[700],
                    mb: 0.5,
                  }}
                >
                  Price
                </Typography>

                {/* Select Price Range */}

                <CustomSlider
                  value={priceRange}
                  onChange={(event, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={20000}
                  step={1000}
                />
              </Box>
            </Grid>

            {/* Property Type */}

            <Grid item xs={12} sm={6} md={2.8}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "16px",
                    color: (theme) => theme.palette.grey[700],
                    mb: 1,
                  }}
                >
                  Property Type
                </Typography>

                {/* Select Property Type Dropdown */}

                <StyledSelect
                  value={selectedPropertyType}
                  onChange={(event) =>
                    setSelectedPropertyType(event.target.value)
                  }
                  displayEmpty
                  inputProps={{ "aria-label": "Without border" }}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Select Property Type
                  </MenuItem>
                  <MenuItem value="Apartment"> Apartment</MenuItem>
                  <MenuItem value="Cottage">Cottage</MenuItem>
                  <MenuItem value="Townhouse">Townhouse</MenuItem>
                  <MenuItem value="Detached House">Detached House</MenuItem>
                </StyledSelect>
              </Box>
            </Grid>

            {/* Button */}

            <Grid item xs={12} sm={6} md={2.4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  sx={{
                    bgcolor: "#7B7DEC",
                    color: "#fff",
                    px: "30px",
                    py: "8px",
                    borderRadius: "18px",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                  onClick={handleGetAllProperties}
                >
                  Apply
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Property List => GRID VIEW */}

        <Grid container spacing={2} sx={{ pb: 8, mt: 4 }}>
          {propertyList?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <PropertyCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
