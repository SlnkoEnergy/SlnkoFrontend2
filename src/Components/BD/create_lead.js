import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Grid, Typography, Sheet, Select, Option, FormLabel } from "@mui/joy";

const CreateLead = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    mobile: "",
    altMobile: "",
    village: "",
    district: "",
    state: "",
    scheme: "",
    capacity: "",
    subStationDistance: "",
    tariff: "",
    availableLand: "",
    landType: "",
    followUpDate: "",
    interest: "",
    comments: ""
  });
  const [loading, setLoading] = useState(false);

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://api.example.com/submit", formData);
      console.log("Success:", response.data);
      alert("Lead created successfully!");
      setFormData({
        customerName: "",
        companyName: "",
        email: "",
        mobile: "",
        altMobile: "",
        village: "",
        district: "",
        state: "",
        scheme: "",
        capacity: "",
        subStationDistance: "",
        tariff: "",
        availableLand: "",
        landType: "",
        followUpDate: "",
        interest: "",
        comments: ""
      });
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead");
    }
    setLoading(false);
  };

  return (
    <Sheet variant="outlined" sx={{ p: 5, borderRadius: "lg", maxWidth: 800, mx: "auto", mt: 5, boxShadow: 4 }}>
      <Typography level="h3" mb={4} textAlign="center" fontWeight="bold">Create Lead</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}><FormLabel>Customer Name</FormLabel><Input name="customerName" value={formData.customerName} onChange={handleChange} required fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Company Name</FormLabel><Input name="companyName" value={formData.companyName} onChange={handleChange} required fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Email ID</FormLabel><Input name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Mobile Number</FormLabel><Input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Alt Mobile Number</FormLabel><Input name="altMobile" type="tel" value={formData.altMobile} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Village Name</FormLabel><Input name="village" value={formData.village} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>District Name</FormLabel><Input name="district" value={formData.district} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Select State</FormLabel>
            <Select name="state" value={formData.state} onChange={(e, newValue) => setFormData({ ...formData, state: newValue })} required fullWidth>
              {statesOfIndia.map(option => <Option key={option} value={option}>{option}</Option>)}
            </Select>
          </Grid>
          <Grid xs={12} sm={6}><FormLabel>Capacity</FormLabel><Input name="capacity" value={formData.capacity} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Sub Station Distance (KM)</FormLabel><Input name="subStationDistance" value={formData.subStationDistance} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Tariff (Per Unit)</FormLabel><Input name="tariff" value={formData.tariff} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Available Land</FormLabel><Input name="availableLand" value={formData.availableLand} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Follow-up Date</FormLabel><Input name="followUpDate" type="date" value={formData.followUpDate} onChange={handleChange} fullWidth /></Grid>
          <Grid xs={12} sm={6}><FormLabel>Scheme</FormLabel>
            <Select name="scheme" value={formData.scheme} onChange={(e, newValue) => setFormData({ ...formData, scheme: newValue })} required fullWidth>
              {["KUSUM A", "KUSUM C", "Other"].map(option => <Option key={option} value={option}>{option}</Option>)}
            </Select>
          </Grid>
          <Grid xs={12} sm={6}><FormLabel>Land Type</FormLabel>
            <Select name="landType" value={formData.landType} onChange={(e, newValue) => setFormData({ ...formData, landType: newValue })} required fullWidth>
              {["Leased", "Owned"].map(option => <Option key={option} value={option}>{option}</Option>)}
            </Select>
          </Grid>
          <Grid xs={12} sm={6}><FormLabel>Interest</FormLabel>
            <Select name="interest" value={formData.interest} onChange={(e, newValue) => setFormData({ ...formData, interest: newValue })} required fullWidth>
              {["Yes", "No"].map(option => <Option key={option} value={option}>{option}</Option>)}
            </Select>
          </Grid>
          <Grid xs={12}><FormLabel>Comments</FormLabel><Input name="comments" value={formData.comments} onChange={handleChange} fullWidth multiline rows={4} /></Grid>
          <Grid xs={12}><Button type="submit" loading={loading} variant="solid" fullWidth>Create Lead</Button></Grid>
        </Grid>
      </form>
    </Sheet>
  );
};

export default CreateLead;
