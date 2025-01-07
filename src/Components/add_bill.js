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
          "http://147.93.20.206:8080/v1/get-all-po"
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
        "http://147.93.20.206:8080/v1/add-bill",
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
                <Input
                  fullWidth
                  placeholder="Project ID"
                  name="p_id"
                  value={formValues.p_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="PO Number"
                  name="po_number"
                  value={formValues.po_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="Vendor"
                  name="vendor"
                  value={formValues.vendor}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 2 */}
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  type="date"
                  placeholder="PO Date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="Item Name"
                  name="item"
                  value={formValues.item}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="PO Value (with GST)"
                  name="po_value"
                  value={formValues.po_value}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 3 */}
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="Bill Number"
                  name="bill_number"
                  value={formValues.bill_number}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  type="date"
                  placeholder="Bill Date"
                  name="bill_date"
                  value={formValues.bill_date}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={4}>
                <Input
                  fullWidth
                  placeholder="Bill Value"
                  name="bill_value"
                  value={formValues.bill_value}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 4 */}
              <Grid xs={12}>
                <Autocomplete
                  options={billTypes}
                  getOptionLabel={(option) => option.label}
                  value={
                    billTypes.find((type) => type.value === formValues.bill_type) || null
                  }
                  onChange={handleAutocompleteChange}
                  placeholder="Type of Bill"
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
