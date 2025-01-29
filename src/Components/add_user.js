import React, { useState } from "react";
import {
  Box,
  Input,
  Typography,
  Button,
  Sheet,
  Select,
  Option,
  FormControl,
  FormLabel,
  Grid,
  Divider,
} from "@mui/joy";
import axios from "axios";

import Img11 from "../Assets/add_user.png";

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    emp_id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: "",
  });

  const handleChange = (e, newValue) => {
    const { name, value } = e.target || { name: e, value: newValue };
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    try {
      const response = await axios.post(
        "http://147.93.20.206:8080/v1/user-registration",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("User registered successfully:", response.data);
      alert("User registered successfully!");
      setFormData({
        emp_id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        password: "",
      });
    } catch (error) {
      console.error("Error registering user:", error.response || error);
      alert("Failed to register user. Please try again.");
    }
  };

  const handleBack = () => {
    console.log("Back button clicked.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(-45deg, #e7eaf6, #a2a8d3, #38598b)",
        padding: "20px",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "lg",
          bgcolor: "background.surface",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid #5791ff",
              borderRadius: "50%",
              maxWidth: "90px",
              margin: "auto",
            }}
          >
            <img
              src={Img11}
              alt="logo-icon"
              style={{ borderRadius: "4px", maxHeight: "70px" }}
            />
          </Box>
          <Typography level="h3" sx={{ textTransform: "uppercase", fontWeight: 800 }}>
            Add User
          </Typography>
          <Typography level="body2" sx={{ fontWeight: 700 }}>
            Add New User
          </Typography>
          <Divider sx={{ width: "50%", margin: "10px auto" }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Employee ID", name: "emp_id" },
              { label: "User Name", name: "name" },
              { label: "User Email", name: "email", type: "email" },
              { label: "Contact Number", name: "phone" },
              { label: "Password", name: "password", type: "password" },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <FormControl fullWidth>
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            ))}

{["role", "department"].map((field) => (
  <Grid item xs={12} key={field}>
    <FormControl fullWidth>
      <FormLabel>{field === "role" ? "User Role" : "Department"}</FormLabel>
      <Select
        name={field}
        value={formData[field]}
        onChange={(e, newValue) => handleChange(field, newValue)}
        required
      >
        {(field === "role"
          ? ["Front-end Developer", "Back-end Developer", "Manager", "Assistant Manager", "Executive", "Executive Initial",
             "Executive Follow", "Executive Warm", "Eng Executive One", "Eng Executive Two",
              "SCM Executive One", "SCM Executive Two", "Project Engineer", "Team Lead" ]
          : ["IT", "Engineering", "SCM", "BD", "Operation", "Project", "Accounts"]
        ).map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </FormControl>
  </Grid>
))}


            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="solid" color="primary" sx={{ marginRight: 2 }}>
                Submit
              </Button>
              <Button variant="outlined" color="neutral" onClick={handleBack}>
                Back
              </Button>
            </Grid>
          </Grid>
        </form>
      </Sheet>
    </Box>
  );
};

export default AddUserForm;