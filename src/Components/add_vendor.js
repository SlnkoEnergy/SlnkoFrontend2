import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Input,
  Divider,
  Container,
} from "@mui/joy";
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

  const [responseMessage, setResponseMessage] = useState("");

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
        "https://api.slnkoprotrac.com/v1/Add-vendor", // Replace with your API endpoint
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
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        p: 3,
        boxShadow: "md",
        borderRadius: "md",
        backgroundColor: "background.surface",
      }}
    >
      <Box textAlign="center" mb={3}>
        <img
          src={Img7}
          alt="logo-icon"
          style={{ height: "50px", marginBottom: "10px" }}
        />
        <Typography level="h4" fontWeight="bold">
          Add Vendor Details
        </Typography>
        <Typography level="body2" textColor="text.secondary">
          Add Vendor Details
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Input
              name="name"
              placeholder="Vendor Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid xs={12} md={6}>
            <Input
              name="Account_No"
              placeholder="Account Number"
              value={formData.Account_No}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid xs={12} md={6}>
            <Input
              name="IFSC_Code"
              placeholder="IFSC Code"
              value={formData.IFSC_Code}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid xs={12} md={6}>
            <Input
              name="Bank_Name"
              placeholder="Bank Name"
              value={formData.Bank_Name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button type="submit" color="primary" variant="solid">
            Submit
          </Button>
        </Box>
        {responseMessage && (
          <Typography sx={{ mt: 2, color: responseMessage.includes("successfully") ? "success.main" : "danger.main" }}>
            {responseMessage}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default AddVendor;
