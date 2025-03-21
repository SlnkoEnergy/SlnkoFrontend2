import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Input,
  Button,
  Autocomplete,
} from "@mui/joy";
import Img10 from '../Assets/pay-request.png';


const AddBillForm = () => {
  const [formValues, setFormValues] = useState({
    p_id: "",
    po_number: "",
    vendor: "",
    date: "",
    item: "",
    po_value: "",
    bill_number: "",
    bill_date: "",
    bill_value: "",
    bill_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const billTypes = [
    { label: "Final", value: "Final" },
    { label: "Partial", value: "Partial" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.slnkoprotrac.com/v1/get-all-po"
        );
        const data = response.data?.data?.[1]; // Assuming the first PO is needed
        if (data) {
          setFormValues((prev) => ({
            ...prev,
            p_id: data.p_id || "",
            po_number: data.po_number || "",
            vendor: data.vendor || "",
            date: data.date || "",
            item: data.item || "",
            po_value: data.po_value || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching PO data:", err);
        setError("Failed to fetch PO data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleAutocompleteChange = (_, newValue) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      bill_type: newValue?.value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToPost = {
      po_number: formValues.po_number,
      bill_number: formValues.bill_number,
      bill_date: formValues.bill_date,
      bill_value: formValues.bill_value,
      bill_type: formValues.bill_type,
    };

    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/add-bill",
        dataToPost
      );
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.level1",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          padding: "30px",
          boxShadow: "md",
          borderRadius: "sm",
          backgroundColor: "background.surface",
        }}
      >
        <Box textAlign="center" mb={3}>
          <img
            src={Img10}
            alt="logo-icon"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Typography level="h4" fontWeight="bold" color="primary">
            Add Bill
          </Typography>
        </Box>
  
        {loading ? (
          <Typography textAlign="center">Loading...</Typography>
        ) : error ? (
          <Typography textAlign="center" color="danger">
            {error}
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Project ID
                </Typography>
                <Input
                  fullWidth
                  name="p_id"
                  value={formValues.p_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  PO Number
                </Typography>
                <Input
                  fullWidth
                  name="po_number"
                  value={formValues.po_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Vendor
                </Typography>
                <Input
                  fullWidth
                  name="vendor"
                  value={formValues.vendor}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Row 2 */}
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  PO Date
                </Typography>
                <Input
                  fullWidth
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Item Name
                </Typography>
                <Input
                  fullWidth
                  name="item"
                  value={formValues.item}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  PO Value (with GST)
                </Typography>
                <Input
                  fullWidth
                  name="po_value"
                  value={formValues.po_value}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Row 3 */}
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Bill Number
                </Typography>
                <Input
                  fullWidth
                  name="bill_number"
                  value={formValues.bill_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Bill Date
                </Typography>
                <Input
                  fullWidth
                  type="date"
                  name="bill_date"
                  value={formValues.bill_date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Bill Value
                </Typography>
                <Input
                  fullWidth
                  name="bill_value"
                  value={formValues.bill_value}
                  onChange={handleChange}
                  required
                />
              </Grid>
  
              {/* Row 4 */}
              <Grid xs={12}>
                <Typography level="body1" fontWeight="bold" mb={1}>
                  Type of Bill
                </Typography>
                <Autocomplete
                  options={billTypes}
                  getOptionLabel={(option) => option.label}
                  value={
                    billTypes.find((type) => type.value === formValues.bill_type) ||
                    null
                  }
                  onChange={handleAutocompleteChange}
                  placeholder="Select Type"
                />
              </Grid>
  
              {/* Submit Button */}
              <Grid xs={12} textAlign="center">
                <Button type="submit" color="primary" sx={{ mx: 1 }}>
                  Submit
                </Button>
                <Button variant="soft" color="neutral" href="po_dashboard.php">
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Box>
  );
  
  
};

export default AddBillForm;
