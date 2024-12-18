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
    const fetchPaymentData = async () => {
      console.log("Fetching payment data...");
      try {
        const response = await axios.get("https://backendslnko.onrender.com/v1/get-pay-summary");
        const rawData = response.data;

        if (rawData && Array.isArray(rawData)) {
          const structuredData = rawData.map((item) => ({
            id: item.id || Math.random(), // Add a unique key if not provided
            debitAccount:  "123458888",
            acc_number: item.acc_number || "",
            benificiary: item.benificiary || "",
            amount_paid: item.amount_paid || 0,
            pay_mod: item.amount_paid > 100000 ? "R" : "N",
            dbt_date: item.dbt_date ? new Date(item.dbt_date).toLocaleDateString("en-GB") : "",
            ifsc: item.ifsc || "",
            comment: item.comment || "",
          }));

          console.log("Structured payment data:", structuredData);
          setData(structuredData);
        } else {
          console.error("Invalid data format received:", rawData);
          setError("Invalid data format. Unable to load payment details.");
        }
      } catch (err) {
        console.error("Error fetching payment data:", err.message);
        setError("Failed to fetch payment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
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
      "Payable Location",
      "Print Location",
      "Bene Mobile No.",
      "Bene Email ID",
      "Bene add1",
      "Bene add2",
      "Bene add3",
      "Bene add4",
      "Add Details 1",
      "Add Details 2",
      "Add Details 3",
      "Add Details 4",
      "Add Details 5",
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
            row.payable_location,
            row.print_location,
            row.bene_mobile_no,
            row.bene_email_id,
            row.bene_add1,
            row.bene_add2,
            row.bene_add3,
            row.bene_add4,
            row.add_details_1,
            row.add_details_2,
            row.add_details_3,
            row.add_details_4,
            row.add_details_5,
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
                <TableCell>{row.debitAccount}</TableCell>
                <TableCell>{row.acc_number}</TableCell>
                <TableCell>{row.benificiary}</TableCell>
                <TableCell>{row.amount_paid}</TableCell>
                <TableCell>{row.pay_mod}</TableCell>
                <TableCell>{row.dbt_date}</TableCell>
                <TableCell>{row.ifsc}</TableCell>
                <TableCell>{row.payable_location}</TableCell>
                <TableCell>{row.print_location}</TableCell>
                <TableCell>{row.bene_mobile_no}</TableCell>
                <TableCell>{row.bene_email_id}</TableCell>
                <TableCell>{row.bene_add1}</TableCell>
                <TableCell>{row.bene_add2}</TableCell>
                <TableCell>{row.bene_add3}</TableCell>
                <TableCell>{row.bene_add4}</TableCell>
                <TableCell>{row.add_details_1}</TableCell>
                <TableCell>{row.add_details_2}</TableCell>
                <TableCell>{row.add_details_3}</TableCell>
                <TableCell>{row.add_details_4}</TableCell>
                <TableCell>{row.add_details_5}</TableCell>
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
