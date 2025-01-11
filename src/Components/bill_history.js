import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import axios from "axios";

function BillHistoryTable() {
  const [poData, setPoData] = useState([]);
  const [billData, setBillData] = useState([]);
  const [matchingData, setMatchingData] = useState([]);

  // Fetch Purchase Order data (get-all-po)
  useEffect(() => {
    async function fetchPoData() {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-po");
        console.log("PO Data:", response.data); // Check PO Data
        setPoData(response.data);
      } catch (error) {
        console.error("Error fetching PO data:", error);
      }
    }
    fetchPoData();
  }, []);

  // Fetch Bill data (get-all-bill)
  useEffect(() => {
    async function fetchBillData() {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-bill");
        console.log("Bill Data:", response.data); // Check Bill Data
        setBillData(response.data);
      } catch (error) {
        console.error("Error fetching Bill data:", error);
      }
    }
    fetchBillData();
  }, []);

  // Match PO data with Bill data
  useEffect(() => {
    if (poData.length && billData.length) {
      const matchedData = poData.map((po) => {
        const bill = billData.find((bill) => bill.po_number === po.po_number);
        
        
        if (bill) {
          return {
            bill_date: bill.bill_date,
            bill_number: bill.bill_number,
            bill_value: bill.bill_value,
            submittedBy: bill.submitted_by,
          };
        }
        return null; // No match
      }).filter((item) => item !== null);

      console.log("Matched Data:", matchedData); // Log matched data
      setMatchingData(matchedData);
    }
  }, [poData, billData]); // Trigger when poData or billData changes

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "auto" }}>
      {/* Title */}
      <Typography
        level="h4"
        component="h1"
        sx={{
          marginBottom: 3,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          color: "primary.main",
        }}
      >
        Bill History Summary
      </Typography>

      {/* Table */}
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "md",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Table Header */}
        <Box
          component="thead"
          sx={{
            backgroundColor: "neutral.300",
            color: "neutral.900",
          }}
        >
          <Box component="tr">
            <Box
              component="th"
              sx={{
                padding: 2,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Bill Date
            </Box>
            <Box
              component="th"
              sx={{
                padding: 2,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Bill Number
            </Box>
            <Box
              component="th"
              sx={{
                padding: 2,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Bill Value
            </Box>
            <Box
              component="th"
              sx={{
                padding: 2,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Submitted By
            </Box>
          </Box>
        </Box>

        {/* Table Body */}
        <Box component="tbody">
          {matchingData.length > 0 ? (
            matchingData.map((row, index) => (
              <Box
                component="tr"
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "neutral.100" : "neutral.50",
                  "&:hover": {
                    backgroundColor: "neutral.200",
                  },
                }}
              >
                <Box component="td" sx={{ padding: 2 }}>
                  {row.bill_date}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.bill_number}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.bill_value}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.submittedBy}
                </Box>
              </Box>
            ))
          ) : (
            <Box component="tr">
              <Box component="td" colSpan={4} sx={{ textAlign: "center", padding: 2 }}>
                No matching data found
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BillHistoryTable;
