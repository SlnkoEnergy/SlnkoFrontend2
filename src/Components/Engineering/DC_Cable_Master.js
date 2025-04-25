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

const DCCableForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    size: "",
    rated_ac_voltage: "",
    nominal_dc_voltage: "",
    core: "",
    status: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting:", formData);
      const response = await axios.post("https://api.slnkoprotrac.com/v1/add-dc-cable", {
        ...formData,
        submitted_by: "admin",
      });
      console.log("Success:", response.data);
      setFormData({
        make: "",
        size: "",
        rated_ac_voltage: "",
        nominal_dc_voltage: "",
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
          Add New DC Cable
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Make</FormLabel>
              <Input name="make" value={formData.make} onChange={(e) => handleChange("make", e.target.value)} />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Size</FormLabel>
              <Input name="size" value={formData.size} onChange={(e) => handleChange("size", e.target.value)} />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Rated AC Voltage (kV)</FormLabel>
              <Input
                name="rated_ac_voltage"
                value={formData.rated_ac_voltage}
                onChange={(e) => handleChange("rated_ac_voltage", e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Nominal DC Voltage</FormLabel>
              <Input
                name="nominal_dc_voltage"
                value={formData.nominal_dc_voltage}
                onChange={(e) => handleChange("nominal_dc_voltage", e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Core</FormLabel>
              <Input name="core" value={formData.core} onChange={(e) => handleChange("core", e.target.value)} />
            </FormControl>
          </Grid>

          {/* ✅ Integrated Custom Status Field */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <FormLabel>Status</FormLabel>
              <Select
                value={formData.status}
                onChange={(_, value) => handleChange("status", value)}
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

          {/* Buttons Centered */}
          <Grid xs={12} display="flex" justifyContent="center" gap={2} mt={2}>
            <Button variant="outlined" color="neutral" onClick={handleBack} startDecorator={<ArrowBackIcon />}>
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

export default DCCableForm;
