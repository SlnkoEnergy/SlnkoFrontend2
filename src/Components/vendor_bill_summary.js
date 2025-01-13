import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import axios from "axios";

function VendorBillSummary() {
  const [poData, setPoData] = useState([]);
  const [billData, setBillData] = useState([]);
  const [matchingData, setMatchingData] = useState([]);

  // Fetch Purchase Order data (get-all-po)
  useEffect(() => {
    async function fetchPoData() {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-po");
        console.log("PO Data:", response.data.data); // Check PO Data
        setPoData(response.data.data);
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
        console.log("Bill Data:", response.data.data); // Check Bill Data
        setBillData(response.data.data);
      } catch (error) {
        console.error("Error fetching Bill data:", error);
      }
    }
    fetchBillData();
  }, []);

  useEffect(() => {
    if (poData.length && billData.length) {
      const matchedData = poData.flatMap((po) => {
        const matchedBills = billData.filter((bill) => bill.po_number === po.po_number);

        if (matchedBills.length > 0) {
          const totalBilled = matchedBills.reduce((sum, b) => sum + parseFloat(b.bill_value || 0), 0);

          return matchedBills.map((bill) => ({
            p_id: po.p_id,
            po_number: po.po_number,
            vendor: po.vendor,
            item: po.item,
            bill_number: bill.bill_number,
            bill_date: bill.bill_date,
            bill_value: bill.bill_value,
            po_value: po.po_value,
            total_billed: totalBilled,
            po_status: totalBilled === po.po_value ? "Fully Billed" : "Bill Pending", // Set PO status
            po_balance: po.po_value - totalBilled, // Calculate PO balance dynamically
            received: "Pending", // Default status for received
            approved_by: bill.approved_by,
            created_on: bill.created_on,
          }));
        }
        return [];
      });

      console.log("Matched Data:", matchedData); // Log matched data
      setMatchingData(matchedData);
    }
  }, [poData, billData]);

  const handleAcceptance = (index) => {
    setMatchingData((prevData) =>
      prevData.map((row, i) =>
        i === index ? { ...row, received: "Accepted" } : row
      )
    );
  };

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
        Vendor Bill Summary
      </Typography>

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
        <Box
          component="thead"
          sx={{
            backgroundColor: "neutral.300",
            color: "neutral.900",
          }}
        >
          <Box component="tr">
            {[
              "Project ID",
              "PO NO.",
              "Vendor",
              "Item",
              "Bill No.",
              "Bill Date",
              "Bill Value",
              "PO Value",
              "Total Billed",
              "PO Status",
              "PO Balance",
              "Received",
              "Approved By",
              "Created On",
            ].map((header, index) => (
              <Box
                component="th"
                key={index}
                sx={{
                  padding: 2,
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {header}
              </Box>
            ))}
          </Box>
        </Box>

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
                <Box component="td" sx={{ padding: 2 }}>{row.p_id}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.po_number}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.vendor}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.item}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.bill_number}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.bill_date}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.bill_value}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.po_value}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.total_billed}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.po_status}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.po_balance}</Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.received === "Accepted" ? (
                    "Accepted"
                  ) : (
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={() => handleAcceptance(index)}
                    >
                      Acceptance
                    </Button>
                  )}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>{row.approved_by}</Box>
                <Box component="td" sx={{ padding: 2 }}>{row.created_on}</Box>
              </Box>
            ))
          ) : (
            <Box component="tr">
              <Box component="td" colSpan={14} sx={{ textAlign: "center", padding: 2 }}>
                No matching data found
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default VendorBillSummary;
