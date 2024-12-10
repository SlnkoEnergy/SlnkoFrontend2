import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import Img12 from '../Assets/create_lead.png';
const CreateLeadForm = () => {
  const states = [
    "Andhra Pradesh",
    "Andaman and Nicobar Islands",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadar and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
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

  const schemes = ["KUSUM A", "KUSUM C", "OTHER"];

  const landTypes = ["Leased", "Owned"];
  const interests = ["Yes", "No"];

  return (
    <Container maxWidth="md" sx={{ mt: 5, background: "rgba(255,255,255,0.8)", p: 4, borderRadius: 3, boxShadow: 3 }}>
      {/* Header */}
      <Box textAlign="center" mb={3}>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #5791ff",
            backgroundColor: "#f9f9f9",
            borderRadius: "50%",
            width: "90px",
            height: "90px",
            mx: "auto",
          }}
        >
          <img src={Img12} style={{ maxWidth: "70px" }} />
        </Box>
        <Typography variant="h4" sx={{ fontFamily: "Bona Nova SC", textTransform: "uppercase", color: "gold", fontWeight: 800 }}>
          Create Lead
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "antiquewhite" }}>
          Create New Lead
        </Typography>
        <hr style={{ width: "50%", fontWeight: "bold", background: "darkgoldenrod", margin: "auto" }} />
      </Box>

      {/* Form */}
      <form>
        <Grid container spacing={3}>
          {/* Customer and Company Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customer"
              required
              variant="outlined"
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Company Name" name="company" variant="outlined" />
          </Grid>

          {/* Email, Mobile, and Alternate Number */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              type="email"
              variant="outlined"
              placeholder="Enter email"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="number"
              type="tel"
              required
              variant="outlined"
              placeholder="Mobile Number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Alternate Mobile Number"
              name="alt_number"
              type="tel"
              variant="outlined"
              placeholder="Alternate Mob Number"
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Village Name"
              name="village"
              required
              variant="outlined"
              placeholder="Enter Village Name"
            />
            <Box mt={2}>
              <TextField
                fullWidth
                label="District Name"
                name="district"
                required
                variant="outlined"
                placeholder="Enter District Name"
              />
            </Box>
            <Box mt={2}>
              <Autocomplete
                options={states}
                renderInput={(params) => <TextField {...params} label="State" variant="outlined" required />}
              />
            </Box>
          </Grid>

          {/* Scheme and Capacity */}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={schemes}
              renderInput={(params) => <TextField {...params} label="Scheme" variant="outlined" required />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Capacity (MW)"
              name="capacity"
              type="number"
              required
              variant="outlined"
              placeholder="Capacity (MW)"
            />
          </Grid>

          {/* Sub Station Distance and Tariff */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sub Station Distance (KM)"
              name="distance"
              type="number"
              required
              variant="outlined"
              placeholder="Distance in KM"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tariff (Per Unit)"
              name="tariff"
              type="number"
              variant="outlined"
              placeholder="Tariff (Per Unit)"
            />
          </Grid>

          {/* Land Available and Follow-up */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Land Available (Acres)"
              name="land"
              type="number"
              required
              variant="outlined"
              placeholder="Available Land"
            />
            <Box mt={2}>
              <Autocomplete
                options={landTypes}
                renderInput={(params) => <TextField {...params} label="Land Type" variant="outlined" required />}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Follow Up Date"
              name="followup_date"
              type="date"
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <Box mt={2}>
              <Autocomplete
                options={interests}
                renderInput={(params) => <TextField {...params} label="Interest" variant="outlined" required />}
              />
            </Box>
          </Grid>

          {/* Comments */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comments"
              name="comments"
              required
              variant="outlined"
              placeholder="Enter Comments"
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} textAlign="center">
            <Button type="submit" variant="contained" color="primary" sx={{ mx: 2 }}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => (window.location.href = "view_all_leads.php")}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateLeadForm;
