import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Img1 from '../../Assets/Add New Module.png';


const HTPanelForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    vcb_make: "",
    pt_ratio: "",
    vcb_rating: "",
    ct_make: "",
    ct_ratio: "",
    cable_size_incoming: "",
    pt_make: "",
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
      const response = await axios.post("https://api.slnkoprotrac.com/v1/add-htpanel-master", {
        ...formData,
        submitted_by: "admin",
      });
      console.log("Success:", response.data);
      setFormData({
        make: "",
        vcb_make: "",
        pt_ratio: "",
        vcb_rating: "",
        ct_make: "",
        ct_ratio: "",
        cable_size_incoming: "",
        pt_make: "",
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
          Add New HT Panel
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
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Make</FormLabel>
              <Input name="make" value={formData.make} onChange={(e) => handleChange("make", e.target.value)} />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>VCB Make</FormLabel>
              <Input name="vcb_make" value={formData.vcb_make} onChange={(e) => handleChange("vcb_make", e.target.value)} />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>PT Ratio</FormLabel>
              <Input name="pt_ratio" value={formData.pt_ratio} onChange={(e) => handleChange("pt_ratio", e.target.value)} />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>VCB Rating</FormLabel>
              <Input name="vcb_rating" value={formData.vcb_rating} onChange={(e) => handleChange("vcb_rating", e.target.value)} />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>CT Make</FormLabel>
              <Input name="ct_make" value={formData.ct_make} onChange={(e) => handleChange("ct_make", e.target.value)} />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>CT Ratio</FormLabel>
              <Input name="ct_ratio" value={formData.ct_ratio} onChange={(e) => handleChange("ct_ratio", e.target.value)} />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Cable Size Incoming (Sqmm)</FormLabel>
              <Input
                name="cable_size_incoming"
                value={formData.cable_size_incoming}
                onChange={(e) => handleChange("cable_size_incoming", e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>PT Make</FormLabel>
              <Input name="pt_make" value={formData.pt_make} onChange={(e) => handleChange("pt_make", e.target.value)} />
            </FormControl>
          </Grid>

          {/* ✅ Integrated Custom Status Field */}
          <Grid item xs={12} sm={12}>
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

export default HTPanelForm;
