import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
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
          "https://backendslnko.onrender.com/v1/get-all-po"
        );
        const data = response.data?.data?.[0]; // Assuming the first PO is needed
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
        "https://backendslnko.onrender.com/v1/add-bill",
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
              {/* Row 1 */}
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project ID"
                  name="p_id"
                  value={formValues.p_id}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="PO Number"
                  name="po_number"
                  value={formValues.po_number}
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

                  label="PO Date"
                  name="date"
                  value={formValues.date}
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
                  name="item"
                  value={formValues.item}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="PO Value (with GST)"
                  name="po_value"
                  value={formValues.po_value}
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
                  name="bill_number"
                  value={formValues.bill_number}
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
                  name="bill_date"
                  value={formValues.bill_date}
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
                  name="bill_value"
                  value={formValues.bill_value}
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
                  value={
                    billTypes.find((type) => type.value === formValues.bill_type) || null
                  } // Fallback to null
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
                  <Button
            variant="outlined"
            color="secondary"
            href="po_dashboard.php"
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

export default AddBillForm;
