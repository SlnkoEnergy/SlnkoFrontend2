import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Input,
  Autocomplete,
  Grid,
  Container,
  Divider,
} from "@mui/joy";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-all-project"
        );
        console.log("Project Datas: ",projectsRes.data.data)
        setProjectIDs(projectsRes.data.data || []);

        const vendorsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-all-vendor"
        );
        console.log("Vendor Datas: ",vendorsRes.data.data)
        setVendors(vendorsRes.data.data || []);

        const itemsRes = await axios.get(
          "http://147.93.20.206:8080/v1/get-item"
        );
        const itemsData = itemsRes.data.Data || [];
        setItems([...itemsData, "Other"]);
        console.log("Item Datas: ",itemsData.data.data)
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

  const handleAutocompleteChange = (field, newValue, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: newValue || "",
      ...(field === "code" && {
        p_id: projectIDs.find((project) => project.code === newValue)?.code || "",
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
    const dataToPost = {
      p_id: formData.code, 
      po_number: formData.po_number,
      vendor: formData.name,
      date: formData.date,
      item: formData.item === "Other" ? "other" : formData.item,
      other: formData.item === "Other" ? formData.other : "",
      po_value: formData.po_value,
    };

    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/Add-purchase-order",
        dataToPost
      );
      console.log("Add Po:",response);
      
      alert("PO added successfully!");
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
        sx={{
          boxShadow: "lg",
          padding: 4,
          borderRadius: "md",
          backgroundColor: "background.surface",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img src={Img7} alt="logo-icon" style={{ height: "50px" }} />
          <Typography level="h4" fontWeight="bold">
            Add Purchase Order
          </Typography>
          <Typography level="body2" textColor="text.secondary">
            Add Purchase Order Details
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} md={4}>
              <Autocomplete
                options={projectIDs.map((project) => ({
                  label: project.code,
                }))}
                value={formData.code ? { label: formData.code } : null}
                onChange={(event, newValue) =>
                  handleAutocompleteChange("code", newValue?.label || "")
                }
                placeholder="Select Project ID"
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Input
                name="po_number"
                placeholder="PO Number"
                value={formData.po_number}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Autocomplete
                options={vendors.map((vendor) => ({
                  label: vendor.name,
                }))}
                value={formData.name ? { label: formData.name } : null}
                onChange={(event, newValue) =>
                  handleAutocompleteChange("name", newValue?.label || "")
                }
                placeholder="Select Vendor"
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Autocomplete
                options={items.map((item) => ({
                  label: typeof item === "object" ? item.item : item,
                }))}
                value={formData.item ? { label: formData.item } : null}
                onChange={(event, newValue) =>
                  handleAutocompleteChange("item", newValue?.label || "")
                }
                placeholder="Select Item"
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Input
                name="po_value"
                type="number"
                placeholder="PO Value (with GST)"
                value={formData.po_value}
                onChange={handleChange}
                required
              />
            </Grid>

            {showOtherItem && (
              <Grid xs={12}>
                <Input
                  name="other"
                  placeholder="Other Item Name"
                  value={formData.other}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
          </Grid>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button type="submit" color="primary" variant="solid">
              Submit
            </Button>
            <Button
              color="neutral"
              variant="soft"
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