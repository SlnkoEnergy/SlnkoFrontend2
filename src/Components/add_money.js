import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import Img6 from "../Assets/add_money.png";

const AddMoneyForm = () => {
  const [formValues, setFormValues] = useState({
    submittedBy: "Admin",
    p_id: "",
    name: "",
    code:"",
    customer: "",
    p_group: "",
    cr_amount: "",
    cr_date: "",
    cr_mode: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://backendslnko.onrender.com/v1/get-all-project");
        const data = response.data?.data?.[0];

        if (data) {
          setFormValues((prev) => ({
            ...prev,
            p_id: data.code || "",
            name: data.name || "",
            customer: data.customer || "",
            p_group: data.p_group || "",
          }));
        } else {
          setError("No projects found. Please add projects before proceeding.");
        }
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to fetch project data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (_, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      cr_mode: newValue || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cr_amount, cr_date, cr_mode, comment,} = formValues;

    if (!cr_amount || !cr_date || !cr_mode || !comment) {
      alert("All fields are required. Please fill out the form completely.");
      return;
    }

    const payload = {
      p_id:formValues.p_id,
      p_group:formValues.p_group,
      cr_amount: formValues.cr_amount,
      cr_date: formValues.cr_date,
      cr_mode: formValues.cr_mode,
      comment: formValues.comment,
    };

    try {
      const response = await axios.post("https://backendslnko.onrender.com/v1/Add-Money", payload, {
        
      });

      console.log("Form submission response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed. Please try again.");
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
        padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          padding: "30px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src={Img6}
            alt="Add Money"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Bona Nova SC, serif",
              textTransform: "uppercase",
              color: "gold",
              fontWeight: 800,
            }}
          >
            Add Money
          </Typography>
          <hr
            style={{
              width: "50%",
              margin: "10px auto",
              background: "darkgoldenrod",
            }}
          />
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Static Fields */}
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label="Submitted By"
                  name="submittedBy"
                  value={formValues.submittedBy}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project ID"
                  name="p_id"
                  value={formValues.p_id}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="name"
                  value={formValues.name}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  name="customer"
                  value={formValues.customer}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Group Name"
                  name="p_group"
                  value={formValues.p_group}
                  variant="outlined"
                  disabled
                />
              </Grid>

              {/* Dynamic Fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Credit Amount (INR ₹)"
                  type="number"
                  name="cr_amount"
                  value={formValues.cr_amount}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Credit Date"
                  type="date"
                  name="cr_date"
                  value={formValues.cr_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={["Cash", "Account Transfer"]}
                  value={formValues.cr_mode}
                  onChange={handleAutocompleteChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Credit Mode"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comments"
                  name="comment"
                  value={formValues.comment}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box textAlign="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "gold",
                      color: "black",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "darkgoldenrod" },
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    href="#"
                    sx={{ ml: 2 }}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default AddMoneyForm;
