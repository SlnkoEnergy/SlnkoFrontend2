import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sheet,
  Typography,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Option,
  Grid,
  Box,
  Divider,
  Autocomplete,
  Chip,
} from "@mui/joy";
import plus from "../../Assets/plus 1.png";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    reference: "",
    by_whom: [],
    comment: "",
  });

  const [bdMembers, setBdMembers] = useState([]);

  useEffect(() => {
    const fetchBdMembers = async () => {
      try {
        const response = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-all-user-IT"
        );
        console.log("API Response:", response.data); // Log to inspect the data structure

        const users = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        const filteredMembers = users.filter(
          (user) => user.department === "BD"
        );

        setBdMembers(
          filteredMembers.map((member) => ({ label: member.name, id: member._id }))
        );
      } catch (error) {
        console.error("Error fetching BD members:", error);
      }
    };

    fetchBdMembers();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleByWhomChange = (_, newValue) => {
    handleChange("by_whom", newValue.map((member) => member.label));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/add-task",
        formData
      );
      console.log("Form Data Submitted Successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <img alt="add" src={plus} />
        <Typography
          level="h4"
          sx={{
            mb: 2,
            textAlign: "center",
            textDecoration: "underline 2px rgb(243, 182, 39)",
            textUnderlineOffset: "8px",
          }}
        >
          Add Task
        </Typography>
      </Box>
      <Box>
        <Divider sx={{ width: "50%" }} />
      </Box>

      <Sheet
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: "30px",
          maxWidth: { xs: "100%", sm: 400 },
          mx: "auto",
          width: "100%",
          boxShadow: "lg",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <FormControl>
              <FormLabel>Customer Name</FormLabel>
              <Input
                fullWidth
                placeholder="Customer Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{ borderRadius: "8px" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Next FollowUp</FormLabel>
              <Input
                fullWidth
                type="date"
                placeholder="Next FollowUp"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                sx={{ borderRadius: "8px" }}
                slotProps={{
                  input: {
                    min: new Date().toISOString().split("T")[0],
                  },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Reference</FormLabel>
              <Select
                value={formData.reference}
                onChange={(e, newValue) => handleChange("reference", newValue)}
                sx={{ borderRadius: "8px" }}
              >
                <Option value="By call">By Call</Option>
                <Option value="By meeting">By Meeting</Option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>By Whom</FormLabel>
              <Autocomplete
                multiple
                options={bdMembers}
                getOptionLabel={(option) => option.label}
                value={formData.by_whom.map((label) => ({ label }))}
                onChange={handleByWhomChange}
                renderInput={(params) => (
                  <Input
                    {...params}
                    placeholder="Select BD Members"
                    sx={{ minHeight: "40px", overflowY: "auto" }}
                  />
                )}
              />
            </FormControl>

            <Stack flexDirection="row" justifyContent="space-between">
              <Button
                sx={{
                  borderRadius: "8px",
                  background: "#f5f5f5",
                  color: "black",
                  border: "1px solid #ddd",
                  "&:hover": { background: "#d6d6d6" },
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                sx={{
                  borderRadius: "8px",
                  background: "#1976d2",
                  color: "white",
                  "&:hover": { background: "#1565c0" },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Sheet>
    </Grid>
  );
};

export default FormComponent;
