import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Img7 from "../Assets/pay-request.png";

const AddPurchaseOrder = () => {
  const [formData, setFormData] = useState({
    p_id: "",
    code: "",
    po_number: "",
    name: "",
    date: "",
    item: "",
    po_value: "",
    other: "",
  });
  const [projectIDs, setProjectIDs] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [showOtherItem, setShowOtherItem] = useState(false);

  // Fetch data sequentially
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");

        const projectsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-all-project"
        );
        console.log("Projects Response:", projectsRes.data.data);
        setProjectIDs(projectsRes.data.data || []);

        const vendorsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-all-vendor"
        );
        console.log("Vendors Response:", vendorsRes.data.data);
        setVendors(vendorsRes.data.data || []);

        const itemsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-item"
        );
        console.log("Items Response:", itemsRes.data);

        const itemsData = itemsRes.data.Data || [];
        if (Array.isArray(itemsData)) {
          setItems([...itemsData, "Other"]);
          console.log("Items Data Processed:", itemsData);
        } else {
          console.warn("Unexpected structure for items:", itemsRes.data);
          setItems(["Other"]); // Fallback to just "Other"
        }
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

  const handleAutocompleteChange = (field, newValue, index) => {
    console.log(`Autocomplete Field Changed: ${field}, Value: ${newValue}, Index: ${index}`);
    setFormData((prev) => ({
      ...prev,
      [field]: newValue || "",
      ...(field === "code" && {
        p_id: projectIDs.find((project) => project.code === newValue)?._id || "",
      }),
      ...(field === "item" && {
        itemIndex: index || "",  // Save the index as part of form data if necessary
      }),
    }));
  
    if (field === "item" && newValue === "Other") {
      setShowOtherItem(true);
    } else if (field === "item") {
      setShowOtherItem(false);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData);

    const dataToPost = {
      p_id: formData.p_id,
      code: formData.code,
      po_number: formData.po_number,
      vendor: formData.name,
      date: formData.date,
      item: formData.item === "Other" ? "other" : formData.item,
      other: formData.item === "Other" ? formData.other : "",
      po_value: formData.po_value,
    };

    try {
      const response = await axios.post(
        "http://147.93.20.206:8080/v1/Add-purchase-order",
        dataToPost
      );
      console.log("Data posted successfully:", response.data);
      alert("PO added successfully!");

      // Reset the form
      setFormData({
        p_id: "",
        code: "",
        po_number: "",
        name: "",
        date: "",
        item: "",
        po_value: "",
        other: "",
      });
      setShowOtherItem(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Autocomplete
                options={projectIDs.map((project) => ({
                  label: project.code,
                }))}
                getOptionLabel={(option) => option.label || ""}
                value={formData.code ? { label: formData.code } : null}
                onChange={(event, newValue) =>
                  handleAutocompleteChange("code", newValue?.label || "")
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select Project ID" required />
                )}
              />
            </Grid>

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

            <Grid item xs={12} md={4}>
            <Autocomplete
  options={vendors.map((vendor, index) => ({
    label: vendor.name,
    key: `${index}-${vendor.name}`, // Unique key for each option
  }))}
  getOptionLabel={(option) => option.label || ""}
  value={formData.name ? { label: formData.name } : null}
  onChange={(event, newValue) =>
    handleAutocompleteChange("name", newValue?.label || "")
  }
  renderInput={(params) => (
    <TextField {...params} label="Select Vendor" required />
  )}
  renderOption={(props, option) => (
    <li {...props} key={option.key}>
      {option.label}
    </li>
  )}
/>

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
            <Autocomplete
                options={items.map((item, index) => ({
                label: typeof item === "object" ? item.item : item,
                key: `${index}-${typeof item === "object" ? item.item : item}`, // Make sure key is unique
            }))}
                getOptionLabel={(option) => option.label || ""}
                value={formData.item ? { label: formData.item } : null}
                onChange={(event, newValue) => {
                  handleAutocompleteChange("item", newValue?.label || "", newValue?.index);
                  }}
                renderInput={(params) => (
                 <TextField {...params} label="Select Item" required />
                )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.key}>
                      {option.label}
                    </li>
  )}
/>


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