import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  Paper,
} from "@mui/material";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Starting data fetch using axios...");
      try {
        // Replace with your actual API endpoint
        const response = await axios.get("https://backendslnko.onrender.com/v1/get-pay-summary");

        console.log("Data fetched successfully:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error while fetching data:", err.message);
        setError(err.message);
      } finally {
        console.log("Data fetch process completed.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    console.log(`Toggling selection for row with ID: ${id}`);
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  const downloadSelectedRows = () => {
    console.log("Preparing to download selected rows...");
    const selectedData = data.filter((row) => selectedRows.includes(row.id));
    console.log("Selected rows data:", selectedData);

    const csvContent = selectedData
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_rows.csv";
    link.click();

    console.log("CSV file download initiated.");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="#e2e8f5"
      >
        <Typography variant="h5" textAlign="center" style={{ flex: 1 }}>
          Payment Detail
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={downloadSelectedRows}
        >
          Download CSV File
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Debit Ac No</TableCell>
              <TableCell>Beneficiary Ac No</TableCell>
              <TableCell>Beneficiary Name</TableCell>
              <TableCell>Amt</TableCell>
              <TableCell>Pay Mod</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>IFSC</TableCell>
              <TableCell>Payable Location</TableCell>
              <TableCell>Print Location</TableCell>
              <TableCell>Bene Mobile No.</TableCell>
              <TableCell>Bene Email ID</TableCell>
              <TableCell>Bene add1</TableCell>
              <TableCell>Bene add2</TableCell>
              <TableCell>Bene add3</TableCell>
              <TableCell>Bene add4</TableCell>
              <TableCell>Add Details 1</TableCell>
              <TableCell>Add Details 2</TableCell>
              <TableCell>Add Details 3</TableCell>
              <TableCell>Add Details 4</TableCell>
              <TableCell>Add Details 5</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>{row.Debit_Ac_No}</TableCell>
                <TableCell>{row.Beneficiary_Ac_No}</TableCell>
                <TableCell>{row.Beneficiary_Name}</TableCell>
                <TableCell>{row.Amt}</TableCell>
                <TableCell>{row.Pay_Mod}</TableCell>
                <TableCell>
                  {new Date(row.Date).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>{row.IFSC}</TableCell>
                <TableCell>{row.Payable_Location}</TableCell>
                <TableCell>{row.Print_Location}</TableCell>
                <TableCell>{row.Bene_Mobile_No}</TableCell>
                <TableCell>{row.Bene_Email_ID}</TableCell>
                <TableCell>{row.Bene_add1}</TableCell>
                <TableCell>{row.Bene_add2}</TableCell>
                <TableCell>{row.Bene_add3}</TableCell>
                <TableCell>{row.Bene_add4}</TableCell>
                <TableCell>{row.Add_Details_1}</TableCell>
                <TableCell>{row.Add_Details_2}</TableCell>
                <TableCell>{row.Add_Details_3}</TableCell>
                <TableCell>{row.Add_Details_4}</TableCell>
                <TableCell>{row.Add_Details_5}</TableCell>
                <TableCell>{row.Remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
