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

const PaymentDetail = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
  
      try {
        const [paySummaryRes, projectRes] = await Promise.all([
          axios.get("https://backendslnko.onrender.com/v1/get-pay-summary"),
          axios.get("https://backendslnko.onrender.com/v1/get-all-project"),
        ]);
  
        const paySummary = paySummaryRes.data?.data || [];
        const projects = projectRes.data?.data || [];
  
        if (Array.isArray(paySummary) && Array.isArray(projects)) {
          const structuredData = paySummary.map((item) => {
            const project = projects.find((proj) => proj.p_id === item.p_id);
            const remarks = `${item.paid_for || ""} + ${item.vendor || ""} + ${project?.code || ""}`;
  
            return {
              id: item.id || Math.random(),
              debitAccount: "025305008971",
              acc_number: item.acc_number || "",
              benificiary: item.benificiary || "",
              amount_paid: item.amount_paid || 0,
              pay_mod: item.amount_paid > 100000 ? "R" : "N",
              dbt_date: item.dbt_date ? new Date(item.dbt_date).toLocaleDateString("en-GB") : "",
              ifsc: item.ifsc || "",
              comment: remarks,
            };
          });
  
          console.log("Structured payment data with remarks:", structuredData);
          setData(structuredData);
        } else {
          console.error("Invalid data format received from APIs.", { paySummary, projects });
          setError("Invalid data format. Unable to load payment details.");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch data. Please try again later.");
      } finally {
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

    const headers = [
      "Debit Ac No",
      "Beneficiary Ac No",
      "Beneficiary Name",
      "Amt",
      "Pay Mod",
      "Date",
      "IFSC",
      "Remarks",
    ];

    const csvContent =
      [headers.join(",")] +
      "\n" +
      selectedData
        .map((row) =>
          [
            row.debitAccount,
            row.acc_number,
            row.benificiary,
            row.amount_paid,
            row.pay_mod,
            row.dbt_date,
            row.ifsc,
            row.comment,
          ].join(",")
        )
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
                <TableCell>{row.debitAccount}</TableCell>
                <TableCell>{row.acc_number}</TableCell>
                <TableCell>{row.benificiary}</TableCell>
                <TableCell>{row.amount_paid}</TableCell>
                <TableCell>{row.pay_mod}</TableCell>
                <TableCell>{row.dbt_date}</TableCell>
                <TableCell>{row.ifsc}</TableCell>
                <TableCell>{row.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentDetail;
