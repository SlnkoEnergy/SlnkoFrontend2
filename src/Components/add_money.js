import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import Img6 from '../Assets/add_money.png';

const AddMoneyForm = () => {
  const [formData, setFormData] = useState({
    submittedBy: "Admin Name", // Replace with dynamic value if needed
    projectId: "",
    projectName: "",
    clientName: "",
    groupName: "",
    creditAmount: "",
    creditDate: "",
    creditMode: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    // Add your submit logic here
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      {/* Header */}
      <Box textAlign="center" mb={3}>
        <img
          src={Img6}
          alt="logo-icon"
          style={{ height: "50px", marginBottom: "10px" }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, color: "#12263f" }}>
          Add Money
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Add Money
        </Typography>
        <hr style={{ width: "50%", margin: "auto", marginTop: 10 }} />
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Submitted By */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Submitted By"
              variant="outlined"
              value={formData.submittedBy}
              name="submittedBy"
              disabled
            />
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project ID"
              variant="outlined"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </Grid>

          {/* Client & Group Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Client Name"
              variant="outlined"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Group Name"
              variant="outlined"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
            />
          </Grid>

          {/* Credit Amount */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credit Amount (INR ₹)"
              variant="outlined"
              type="number"
              name="creditAmount"
              value={formData.creditAmount}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Credit Date */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Credit Date"
              variant="outlined"
              type="date"
              name="creditDate"
              value={formData.creditDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          {/* Credit Mode */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Credit Mode</InputLabel>
              <Select
                name="creditMode"
                value={formData.creditMode}
                onChange={handleChange}
                required
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="account_transfer">Account Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Comments */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comments"
              variant="outlined"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ height: 50 }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 50 }}
              href="payment.php" // Replace with actual back link
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddMoneyForm;
