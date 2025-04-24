import React, { useState } from "react";
import {
  Card,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Option,
  Button,
  Typography,
} from "@mui/joy";
import axios from "axios";
import Img1 from '../../Assets/Add New Module.png';

const LTPannelForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    type: "",
    voltage: "",
    status: "",
    submitted_by: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const res = await axios.post("https://api.slnkoprotrac.com/v1/add-ltpanel-master", formData);
      console.log("Submitted:", res.data);
      setResponseMessage("Form submitted successfully!");
      setFormData({
        make: "",
        type: "",
        voltage: "",
        status: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setFormData({
      make: "",
      type: "",
      voltage: "",
      status: "",
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f7f7f7", padding: 2 }}
    >
      <Card variant="outlined" sx={{ maxWidth: 700, width: "100%", p: 4 }}>
        <Typography level="h3" align="center" gutterBottom>
          LT Panel Form
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img
            src={Img1}
            width="40px"
            height="40px"
            alt="Inverter"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Make</FormLabel>
                <Input
                  value={formData.make}
                  onChange={(e) => handleChange("make", e.target.value)}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>type</FormLabel>
                <Input
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={(_, value) => handleChange('status', value)}
                  placeholder="Select Status"
                  required
                  sx={{
                    color:
                      formData.status === 'Available'
                        ? 'green'
                        : formData.status === 'Not Available'
                        ? 'red'
                        : 'inherit',
                  }}
                >
                  <Option value="Available" sx={{ color: 'green' }}>✅ Available</Option>
                  <Option value="Not Available" sx={{ color: 'red' }}>❌ Not Available</Option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>voltage</FormLabel>
                <Input
                  value={formData.voltage}
                  onChange={(e) => handleChange("voltage", e.target.value)}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Button type="submit" variant="solid" color="primary" fullWidth disabled={isSubmitting}>
                Submit
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                onClick={handleBack}
                sx={{
                  borderColor: '#999',
                  color: '#999',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#666',
                  },
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>

          {responseMessage && (
            <Typography level="body-sm" sx={{ mt: 2, textAlign: "center", color: "primary.plainColor" }}>
              {responseMessage}
            </Typography>
          )}
        </form>
      </Card>
    </Grid>
  );
};

export default LTPannelForm;
