import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  Box,
} from "@mui/material";

import Img7 from ".././Assets/pay-request.png";

const AddVendor = () => {
  const [formData, setFormData] = useState({
    vendor_name: "",
    account_no: "",
    ifsc_code: "",
    bank_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
          {/* Vendor Name */}
          <Grid item xs={12} md={6}>
            <TextField
              name="vendor_name"
              label="Vendor Name"
              value={formData.vendor_name}
              onChange={handleChange} // Add onChange handler
              required
              fullWidth
            />
          </Grid>

          {/* Account Number */}
          <Grid item xs={12} md={6}>
            <TextField
              name="account_no"
              label="Account Number"
              value={formData.account_no}
              onChange={handleChange} // Add onChange handler
              required
              fullWidth
            />
          </Grid>

          {/* IFSC Code */}
          <Grid item xs={12} md={6}>
            <TextField
              name="ifsc_code"
              label="IFSC Code"
              value={formData.ifsc_code}
              onChange={handleChange} // Add onChange handler
              required
              fullWidth
            />
          </Grid>

          {/* Bank Name */}
          <Grid item xs={12} md={6}>
            <TextField
              name="bank_name"
              label="Bank Name"
              value={formData.bank_name}
              onChange={handleChange} // Add onChange handler
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            href="po_dashboard.php"
            sx={{ ml: 2 }}
          >
            Back
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddVendor;
