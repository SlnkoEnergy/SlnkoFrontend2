import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const ACCableForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    size: "",
    lt_ht: "",
    voltage_rating: "",
    type: "",
    core: "",
    status: "",
  });

  // Updated handleChange function for correct event handling
  const handleChange = (name) => (event, newValue) => {
    // Ensure 'newValue' is being accessed properly for select inputs
    const value = newValue !== undefined ? newValue : event.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting:", formData);
      const response = await axios.post("https://api.slnkoprotrac.com/v1/add-ac-cable", {
        ...formData,
        submitted_by: "admin",
      });
      console.log("Success:", response.data);
      setFormData({
        make: "",
        size: "",
        lt_ht: "",
        voltage_rating: "",
        type: "",
        core: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <CardContent>
        <Typography level="h4" textAlign="center" gutterBottom>
          AC Cable
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Make</FormLabel>
              <Input
                name="make"
                value={formData.make}
                onChange={handleChange("make")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Size</FormLabel>
              <Input
                name="size"
                value={formData.size}
                onChange={handleChange("size")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>LT/HT</FormLabel>
              <Select
                value={formData.lt_ht}
                onChange={(e, newValue) => handleChange("lt_ht")(e, newValue)} // Proper value handling for select
                placeholder="Select LT/HT"
              >
                <Option value="LT">LT</Option>
                <Option value="HT">HT</Option>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Voltage Rating</FormLabel>
              <Input
                name="voltage_rating"
                value={formData.voltage_rating}
                onChange={handleChange("voltage_rating")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                name="type"
                value={formData.type}
                onChange={handleChange("type")}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Core</FormLabel>
              <Input
                name="core"
                value={formData.core}
                onChange={handleChange("core")}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.status}
                onChange={(e, newValue) => handleChange("status")(e, newValue)} // Proper value handling for select
                placeholder="Select Status"
                required
                sx={{
                  color:
                    formData.status === "Available"
                      ? "green"
                      : formData.status === "Not Available"
                      ? "red"
                      : "inherit",
                }}
              >
                <Option value="Available" sx={{ color: "green" }}>
                  ✅ Available
                </Option>
                <Option value="Not Available" sx={{ color: "red" }}>
                  ❌ Not Available
                </Option>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} display="flex" justifyContent="center" gap={2} mt={2}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleBack}
              startDecorator={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button onClick={handleSubmit} variant="solid" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ACCableForm;
