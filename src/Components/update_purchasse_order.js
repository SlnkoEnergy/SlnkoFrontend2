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
import axios from "axios";
import Img7 from "../Assets/update-po.png";

const UpdatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    p_id: "",
    code: "",
    po_number: "",
    vendor: "",
    date: "",
    item: "",
    po_value: "",
    other: "",
    partial_billing: "",
    comment: "",
  });
  const [projectIDs, setProjectIDs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [showOtherItem, setShowOtherItem] = useState(false);
  const [allPo, setAllPo] = useState([]);
  // Fetching data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching project IDs
        const projectsRes = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-all-project"
        );
        setProjectIDs(projectsRes.data.data || []);
  
        // Fetching vendors
        const vendorsRes = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-all-vendor"
        );
        setVendors(vendorsRes.data.data || []);
  
        // Fetching items
        const itemsRes = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-item"
        );
        setItems([...itemsRes.data.Data, "Other"]);
  
        // Fetching purchase orders
        const poRes = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-all-po"
        );
        setAllPo(poRes.data.data || []);
        console.log("Fetched Purchase Orders:", poRes.data); // You can set state here if needed
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (field, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newValue || "",
      ...(field === "code" && {
        p_id:
          projectIDs.find((project) => project.code === newValue)?.code || "",
      }),
    }));
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
        backgroundColor: "#f4f6f8",
        padding: 3,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
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
            Update Purchase Order Details
          </Typography>
          <hr style={{ width: "50%", margin: "auto", marginTop: 10 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={projectIDs.map((project, index) => ({
                    label: project.code,
                    key: `${project.code}-${index}`,
                  }))}
                  value={formData.code ? { label: formData.code } : null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("code", newValue?.label || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Project Code"
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name="po_number"
                label="PO Number"
                value={allPo.po_number}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={vendors.map((vendor, index) => ({
                    name: vendor.name,
                    key: `${vendor.name}-${index}`,
                  }))} // Pass the vendors array with unique keys
                  getOptionLabel={(option) => option.name || ""} // Access the 'name' property for display
                  value={
                    vendors.find((vendor) => vendor.name === formData.vendor) ||
                    null
                  }
                  onChange={(event, newValue) =>
                    handleAutocompleteChange(
                      "vendor",
                      newValue ? newValue.name : ""
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vendor"
                      variant="outlined"
                      required
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.name}
                    </li>
                  )}
                />
              </FormControl>
            </Grid>

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

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <Autocomplete
                  options={items.map((item, index) => ({
                    label: typeof item === "object" ? item.item : item,
                    key: `${
                      typeof item === "object" ? item.item : item
                    }-${index}`,
                  }))}
                  value={formData.item ? { label: formData.item } : null}
                  onChange={(event, newValue) =>
                    handleAutocompleteChange("item", newValue?.label || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Item" required />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.label}
                    </li>
                  )}
                />
              </FormControl>
            </Grid>

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

            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <TextField
                  select
                  name="partial_billing"
                  label="Partial Billing"
                  value={formData.partial_billing}
                  onChange={handleChange}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                name="comments"
                label="Comments (Why Changes?)"
                value={formData.comment}
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
