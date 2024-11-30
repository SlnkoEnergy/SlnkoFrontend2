import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Img7 from ".././Assets/update-po.png";

const UpdatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    project_id: "",
    po_number: "",
    vendor: "",
    date: "",
    item: "",
    po_value: "",
    other: "",
    partial_billing: "",
    comments: "",
  });
  const [projectID, setProjectID] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [showOtherItem, setShowOtherItem] = useState(false);

  useEffect(() => {
    // Replace with actual API calls
    setProjectID(["Chanda Mama", "Naganeshi", "Bhanwar Lal", "Adijai"]);
    setVendors(["Vendor A", "Vendor B", "Vendor C"]);
    setItems(["Item A", "Item B", "Item C", "Other"]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (field, newValue) => {
    setFormData((prev) => ({ ...prev, [field]: newValue || "" }));

    // Special case for "item" to handle the "Other" option
    if (field === "item" && newValue === "Other") {
      setShowOtherItem(true);
    } else if (field === "item") {
      setShowOtherItem(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8", // Light background for better contrast
        padding: 3,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff", // White background for the form
          p: 4,
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src={Img7}
            alt="logo-icon"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#12263f" }}>
            Update Purchase Order
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Update Purchase Order
          </Typography>
          <hr style={{ width: "50%", margin: "auto", marginTop: 10 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Project ID */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={projectID}
                  getOptionLabel={(option) => option || ""}
                  value={formData.project_id || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("project_id", newValue)
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Project ID"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* PO Number */}
            <Grid item xs={12} md={4}>
              <TextField
                name="po_number"
                label="PO Number"
                value={formData.po_number}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Vendor */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={vendors}
                  getOptionLabel={(option) => option || ""}
                  value={formData.vendor || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("vendor", newValue)
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vendor"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* PO Date */}
            <Grid item xs={12} md={4}>
              <TextField
                name="date"
                type="date"
                label="PO Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Item */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={items}
                  getOptionLabel={(option) => option || ""}
                  value={formData.item || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("item", newValue)
                  }
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Item"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            {/* PO Value */}
            <Grid item xs={12} md={4}>
              <TextField
                name="po_value"
                label="PO Value (with GST)"
                type="number"
                value={formData.po_value}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Other Item */}
            {showOtherItem && (
              <Grid item xs={12}>
                <TextField
                  name="other"
                  label="Other Item Name"
                  value={formData.other}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
            )}

            {/* Partial Billing */}
            <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
    <TextField
      select
      name="partial_billing"
      label="Partial Billing"
      value={formData.partial_billing}
      onChange={handleChange}
      variant="outlined"
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </TextField>
  </FormControl>
            </Grid>

            {/* Comments */}
            <Grid item xs={12} md={8}>
              <TextField
                name="comments"
                label="Comments (Why Changes?)"
                value={formData.comments}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="po_dashboard.php"
              sx={{ ml: 2 }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default UpdatePurchaseOrder;
