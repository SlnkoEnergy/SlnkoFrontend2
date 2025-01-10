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
    const fetchPoData = async () => {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-po");
        console.log("PO Data: ", response.data);  // Logging PO Data for debugging
        setPoData(response.data); // Assuming data is an array
      } catch (error) {
        console.error("Error fetching PO data:", error);
      }
    };

    fetchPoData();
  }, []);

  // Fetch Bill data (get-all-bill)
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-bill");
        console.log("Bill Data: ", response.data);  // Logging Bill Data for debugging
        setBillData(response.data); // Assuming data is an array
      } catch (error) {
        console.error("Error fetching Bill data:", error);
      }
    };

    fetchBillData();
  }, []);

  // Match PO data with Bill data when both are available
  useEffect(() => {
    if (poData.length > 0 && billData.length > 0) {
      const matchedData = poData.map((po) => {
        // Find matching bill data based on PO number
        const bill = billData.find((bill) => bill.po_number === po.po_number);
        if (bill) {
          console.log("Match found: ", po.po_number, bill); // Logging matches for debugging
          return {
            billDate: bill.bill_date,
            billNumber: bill.bill_number,
            billValue: bill.bill_value,
            submittedBy: bill.submitted_by,
          };
        }
        return null;
      }).filter((item) => item !== null); // Filter out null values

      console.log("Matched Data: ", matchedData); // Logging final matched data
      setMatchingData(matchedData); // Set matched data to state
    }
  }, [poData, billData]);

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "auto" }}>
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
          {matchingData.map((row, index) => (
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
              <Box component="td" sx={{ padding: 2 }}>{row.billDate}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.billNumber}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.billValue}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.submittedBy}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default BillHistoryTable;
