import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import Img7 from ".././Assets/pay-request.png";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    name: "",
    Account_No: "",
    IFSC_Code: "",
    Bank_Name: "",
  });
  const initialFormData = {
    name: "",
    Account_No: "",
    IFSC_Code: "",
    Bank_Name: "",
  };

  const [responseMessage, setResponseMessage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Updated Form Data:", formData); // Debugging log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData); // Debugging log

    try {
      const response = await axios.post(
        "https://backendslnko.onrender.com/v1/Add-vendor", // Replace with your API endpoint
        formData
      );
      setResponseMessage("Vendor added successfully!");
      console.log("Response from Server:", response.data);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding vendor:", error.response?.data || error.message);
      setResponseMessage("Failed to add vendor. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Box textAlign="center" mb={3}>
        <img
          src={Img7}
          alt="logo-icon"
          style={{ height: "50px", marginBottom: "10px" }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#12263f" }}>
          Add Vendor Details
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Add Vendor Details
        </Typography>
        <hr style={{ width: "50%", margin: "auto", marginTop: 10 }} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              label="Vendor Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="Account_No"
              label="Account Number"
              value={formData.Account_No}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="IFSC_Code"
              label="IFSC Code"
              value={formData.IFSC_Code}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="Bank_Name"
              label="Bank Name"
              value={formData.Bank_Name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
        {responseMessage && (
          <Typography sx={{ mt: 2, color: "green" }}>
            {responseMessage}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default AddVendor;
