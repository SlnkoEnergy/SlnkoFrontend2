import React, { useState } from "react";
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
import axios from "axios";
import Img9 from "../Assets/solar.png";

// Constants
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
  const [formData, setFormData] = useState({
    code: "",
    p_id: "",
    customer: "",
    name: "",
    p_group: "",
    email: "",
    number: "",
    alternate_mobile_number: "",
    billing_address: {
      village_name: "",
      district_name: "",
    },
    site_address: {
      village_name: "",
      district_name: "",
    },
    state: "",
    project_category: "",
    project_kwp: "",
    distance: "",
    tariff: "",
    land: {
      type: "",
      acres: "",
    },
    service: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (field, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [key]: value },
    }));
  };

  const handleAutocompleteChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Convert the land object to a string
  const payload = {
    ...formData,
    land: JSON.stringify(formData.land), // Stringify the land object
  };

  const handleLandChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      land: { ...prev.land, [key]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backendslnko.onrender.com/v1/add-new-project",
        payload
      );

      // Check if the _id is generated in the response
      if (response.data.success && response.data.data._id) {
        setResponseMessage("Project added successfully!");
        console.log("Generated _id:", response.data.data._id);

        // Reset the form
        setFormData({
          p_id: "",
          code: "",
          customer: "",
          name: "",
          p_group: "",
          email: "",
          number: "",
          alternate_mobile_number: "",
          billing_address: { village_name: "", district_name: "" },
          site_address: { village_name: "", district_name: "" },
          state: "",
          project_category: "",
          project_kwp: "",
          distance: "",
          tariff: "",
          land: { type: "", acres: "" },
          service: "",
        });
      } else {
        setResponseMessage("Failed to add project. No _id generated.");
      }
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error.message);
      setResponseMessage("Failed to add project. Please try again.");
    }
  };

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
        }}
      >
        <Box textAlign="center" sx={{ mb: 4 }}>
          <img src={Img9} alt="Logo" style={{ height: "50px", marginBottom: "10px" }} />
          <Typography variant="h4" fontWeight="800" color="gold">
            Add Project
          </Typography>
          <Divider sx={{ width: "50%", margin: "8px auto", background: "darkgoldenrod" }} />
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Project Info */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Project ID"
                name="code"
                value={formData.code}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Customer Name"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Group Name"
                name="p_group"
                value={formData.p_group}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Mobile Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Alternate Mobile Number"
                name="alternate_mobile_number"
                value={formData.alternate_mobile_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* Address Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Billing Address - Village"
                value={formData.billing_address.village_name}
                onChange={(e) =>
                  handleNestedChange("billing_address", "village_name", e.target.value)
                }
                fullWidth
                required
              />
              <TextField
                label="Billing Address - District"
                value={formData.billing_address.district_name}
                onChange={(e) =>
                  handleNestedChange("billing_address", "district_name", e.target.value)
                }
                fullWidth
                required
                sx={{ mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Site Address - Village"
                value={formData.site_address.village_name}
                onChange={(e) =>
                  handleNestedChange("site_address", "village_name", e.target.value)
                }
                fullWidth
                required
              />
              <TextField
                label="Site Address - District"
                value={formData.site_address.district_name}
                onChange={(e) =>
                  handleNestedChange("site_address", "district_name", e.target.value)
                }
                fullWidth
                required
                sx={{ mt: 2 }}
              />
            </Grid>

            {/* Dropdowns */}
            <Grid item xs={12}>
              <Autocomplete
                options={states}
                value={formData.state}
                onChange={(e, value) => handleAutocompleteChange("state", value)}
                renderInput={(params) => <TextField {...params} label="State" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={categories}
                value={formData.project_category}
                onChange={(e, value) => handleAutocompleteChange("project_category", value)}
                renderInput={(params) => <TextField {...params} label="Category" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Plant Capacity (MW)"
                name="project_kwp"
                value={formData.project_kwp}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>

            {/* Numeric Inputs */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Sub Station Distance (KM)"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tariff (₹ per unit)"
                name="tariff"
                value={formData.tariff}
                onChange={handleChange}
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Land Acres"
                name="acres"
                value={formData.land.acres}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    land: { ...prev.land, acres: e.target.value },
                  }))
                }
                type="number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={landTypes}
                value={formData.land.type}
                onChange={(e, value) => handleLandChange("type", value)}
                renderInput={(params) => <TextField {...params} label="Land Type" />}
                fullWidth
              />
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Add Project
              </Button>
            </Grid>
          </Grid>
        </Box>

        {responseMessage && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body1" color={responseMessage.includes("success") ? "green" : "red"}>
              {responseMessage}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AddProject;
