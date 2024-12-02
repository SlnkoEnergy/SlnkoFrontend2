import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import Img10 from '../Assets/pay-request.png'

const AddBillForm = () => {
  const [formValues, setFormValues] = useState({
    projectId: "",
    poNumber: "",
    vendor: "",
    poDate: "",
    itemName: "",
    poValue: "",
    billNumber: "",
    billDate: "",
    billValue: "",
    billType: "Final",
  });

  const billTypes = [
    { label: "Final", value: "Final" },
    { label: "Partial", value: "Partial" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAutocompleteChange = (_, newValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      billType: newValue?.value || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
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
          src={Img10}
          alt="logo-icon"
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
            Add Bill
          </Typography>
          <hr
            style={{
              width: "50%",
              margin: "10px auto",
              background: "darkgoldenrod",
            }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Row 1 */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Project ID"
                name="projectId"
                value={formValues.projectId}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="PO Number"
                name="poNumber"
                value={formValues.poNumber}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Vendor"
                name="vendor"
                value={formValues.vendor}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="PO Date"
                name="poDate"
                value={formValues.poDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={formValues.itemName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="PO Value (with GST)"
                name="poValue"
                value={formValues.poValue}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bill Number"
                name="billNumber"
                value={formValues.billNumber}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Bill Date"
                name="billDate"
                value={formValues.billDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Bill Value"
                name="billValue"
                value={formValues.billValue}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12} md={12}>
              <Autocomplete
                options={billTypes}
                getOptionLabel={(option) => option.label}
                value={billTypes.find(
                  (type) => type.value === formValues.billType
                )}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type of Bill"
                    variant="outlined"
                    required
                  />
                )}
              />
            </Grid>

            {/* Submit Button */}
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
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default AddBillForm;
