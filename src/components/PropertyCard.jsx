import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Divider,
} from "@mui/material";

// Material Icons

import TerminalIcon from "@mui/icons-material/Terminal"; // Icons for no. of Bedrooms
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"; // Icon for no. of Bathrooms
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined"; // Icon for Area

const PropertyCard = ({
  _id,
  image,
  name,
  price,
  // locality,
  city,
  // country,
  bedRooms,
  bathRooms,
  length,
  width,
}) => {
  return (
    <Card elevation={0} sx={{ bgcolor: "#D9D9D9"}}>

      {/* Image */}

      <CardMedia
        component="img"
        height="140"
        image={image.link}
        alt={`${name}-image`}
        sx={{
            height: "250px"
        }}
      />

      {/* Card Content */}

      <CardContent>

        {/* Rent Per Month */}

        <Box>
          <Typography variant="h6" component="span" fontWeight="600" sx={{ color: "#827BDA" }}>
            &#x20b9; {price}
          </Typography>

          <Typography variant="caption" fontSize="14px">/month</Typography>
        </Box>

        {/* Property Name */}

        <Typography variant="h6" fontWeight="700">
          {name}
        </Typography>

        {/* Full Location */}

        <Typography variant="h6" sx={{ color: ( theme ) => theme.palette.grey[800], fontSize: "18px", fontWeight: "500" }}>
          {`${city}, India`}
        </Typography>

        <Divider />

        {/* Number of Bedrooms, Bathrooms and Total surface Area */}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>

            {/* No. Of Bedrooms */}
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        
                <TerminalIcon sx={{ height: "14px", width: "14px" }}/>
         
                <Typography variant="h6" fontWeight="500" fontSize="14px" >
                    {`${bedRooms} beds`} 
                </Typography>

            </Box>
            
            {/* No. Of Bathrooms */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                <VerifiedOutlinedIcon sx={{ height: "14px", width: "14px" }} />


                <Typography variant="h6" fontWeight="500" fontSize="14px" >
                    {`${bathRooms} Bathrooms`} 
                </Typography>

            </Box>

            {/* Total Surface Area */}

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>

                <ReorderOutlinedIcon sx={{ height: "14px", width: "14px" }} />


                <Typography variant="h6" fontWeight="500" fontSize="14px" >
                    {`${length} x ${width} `}m<sup>2</sup>
                </Typography>

            </Box>

        </Box>

      </CardContent>
    </Card>
  );
};

export default PropertyCard;
