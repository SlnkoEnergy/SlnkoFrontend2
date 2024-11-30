import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
  Paper,
  Autocomplete,
} from "@mui/material";
import Img9 from '../Assets/solar.png';
const states = [
"Andhra Pradesh",
"Arunachal Pradesh",
"Assam",
"Bihar",
"Chhattisgarh",
"Goa",
"Gujarat",
"Haryana",
"Himachal Pradesh",
"Jharkhand",
"Karnataka",
"Kerala",
"Madhya Pradesh",
"Maharashtra",
"Manipur",
"Meghalaya",
"Mizoram",
"Nagaland",
"Odisha",
"Punjab",
"Rajasthan",
"Sikkim",
"Tamil Nadu",
"Telangana",
"Tripura",
"Uttar Pradesh",
"Uttarakhand",
"West Bengal",
];

const categories = ["KUSUM A", "KUSUM C", "OTHER"];
const landTypes = ["Leased", "Owned"];

const AddProject = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          padding: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title Section */}
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
            <img src={Img9}
            style={{ height: "50px", marginBottom: "10px"}} />
          </Box>
          <Typography
            variant="h4"
            fontWeight="800"
            color="gold"
            textTransform="uppercase"
            fontFamily="Bona Nova SC"
          >
            Add Project
          </Typography>
          <Typography variant="body1" fontWeight="700" color="antiquewhite">
            Create New Project
          </Typography>
          <Divider
            sx={{
              width: "50%",
              margin: "8px auto",
              background: "darkgoldenrod",
            }}
          />
        </Box>

        {/* Form Section */}
        <Box component="form" id="add_product">
          <Grid container spacing={3}>
            {/* Project Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Project ID"
                name="code"
                
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Name"
                name="customername"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Project Name"
                name="name"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Group Name"
                name="group"
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Email ID"
                name="email"
                type="email"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Mobile Number"
                name="number"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Alternate Mobile Number"
                name="alt_number"
                fullWidth
                variant="outlined"
              />
            </Grid>

            {/* Address Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Billing Address - Village Name"
                name="village"
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Billing Address - District Name"
                name="district"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Site Address - Village Name"
                name="s_village"
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                label="Site Address - District Name"
                name="site-district"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            {/* Searchable Dropdowns */}
            <Grid item xs={12}>
              <Autocomplete
                options={states}
                renderInput={(params) => <TextField {...params} label="State" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={categories}
                renderInput={(params) => <TextField {...params} label="Category" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Plant Capacity (MW)"
                name="kwh"
                type="number"
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0, max: 1000, step: 0.01 }}
              />
            </Grid>

            {/* Additional Fields */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Sub Station Distance (KM)"
                name="distance"
                type="number"
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0, max: 1000, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tariff (Per Unit)"
                name="tariff"
                type="number"
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0, max: 1000, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Land Available (Acres)"
                name="land"
                type="number"
                fullWidth
                required
                variant="outlined"
                inputProps={{ min: 0, max: 1000, step: 0.01 }}
                sx={{ mb: 2 }}
              />
              <Autocomplete
                options={landTypes}
                renderInput={(params) => <TextField {...params} label="Land Type" required />}
                fullWidth
              />
            </Grid>

            {/* Final Section */}
            <Grid item xs={12}>
              <TextField
                label="SLnko Service Charges (incl. GST)"
                name="service"
                type="number"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} sx={{ textAlign: "center", mt: 3 }}>
              <Button variant="contained" type="submit" sx={{ marginRight: 2 }}>
                Submit
              </Button>
              <Button variant="outlined" href="payment.php?page=1">
                Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddProject;
