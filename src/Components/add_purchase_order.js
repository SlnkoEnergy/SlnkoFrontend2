import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Img7 from "../Assets/pay-request.png";

const AddPurchaseOrder = () => {
  const [formData, setFormData] = useState({
    code: "",
    po_number: "",
    name: "",
    date: "",
    item: "",
    poValue: "",
    other: "",
  });
  const [projectIDs, setProjectIDs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [showOtherItem, setShowOtherItem] = useState(false);

  // Fetch data independently
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const [projectsRes, vendorsRes, itemsRes] = await Promise.all([
          axios.get("https://backendslnko.onrender.com/v1/get-all-project"),
          axios.get("https://backendslnko.onrender.com/v1/get-all-vendor"),
          axios.get("https://backendslnko.onrender.com/v1/get-item"),
        ]);

        console.log("Projects Response:", projectsRes.data.data);
        console.log("Vendors Response:", vendorsRes.data);
        console.log("Items Response:", itemsRes.data);

        setProjectIDs(projectsRes.data.projects || []);
        setVendors(vendorsRes.data.vendors || []);

        // Ensure itemsRes.data.items is an array or fallback to an empty array
        const fetchedItems = Array.isArray(itemsRes.data.items)
          ? itemsRes.data.items
          : [];
        setItems([...fetchedItems, "Other"]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field Changed: ${name}, Value: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (field, newValue) => {
    console.log(`Autocomplete Changed: ${field}, Value: ${newValue}`);
    setFormData((prev) => ({ ...prev, [field]: newValue || "" }));
    if (field === "item" && newValue === "Other") {
      setShowOtherItem(true);
    } else if (field === "item") {
      setShowOtherItem(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        padding: 3,
      }}
    >
      <Container
        maxWidth="md"
        sx={{ boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: "#ffffff" }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src={Img7}
            alt="logo-icon"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#12263f" }}>
            Add Purchase Order
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Add Purchase Order
          </Typography>
          <hr style={{ width: "50%", margin: "auto", marginTop: 10 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container
            spacing={3}
            >
              {/* Project ID */}
              <Grid item xs={12} md={4}>
                <Autocomplete
                  options={projectIDs.map((project) => project.code)}
                  getOptionLabel={(option) => option || ""}
                  value={formData.code || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("code", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Project ID"
                      variant="outlined"
                      required
                    />
                  )}
                />
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
                <Autocomplete
                  options={vendors.map((vendor) => vendor.name)}
                  getOptionLabel={(option) => option || ""}
                  value={formData.name || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("name", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vendor"
                      variant="outlined"
                      required
                    />
                  )}
                />
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
                <Autocomplete
                  options={items}
                  getOptionLabel={(option) => option || ""}
                  value={formData.item || null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("item", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Item"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
  
              {/* PO Value */}
              <Grid item xs={12} md={4}>
                <TextField
                  name="poValue"
                  label="PO Value (with GST)"
                  type="number"
                  value={formData.poValue}
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
  
  export default AddPurchaseOrder;
  