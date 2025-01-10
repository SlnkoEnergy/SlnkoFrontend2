import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

function PoHistoryTable() {
  const rows = [
    {
      poNo: "12345",
      vendor: "ABC Corp",
      poDate: "2025-01-10",
      item: "Office Supplies",
      poValue: "₹50,000",
      reason: "Updated Quantity",
      submittedBy: "Rounik",
    },
    {
      poNo: "12346",
      vendor: "XYZ Corp",
      poDate: "2025-01-12",
      item: "Electronics",
      poValue: "₹1,20,000",
      reason: "Revised Rate",
      submittedBy: "Rounik",
    },
  ];

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
        Purchase Order History
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
              PO NO.
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
              Vendor
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
              PO Date
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
              Item
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
              PO Value with GST
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
              Amendment Reason
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
          {rows.map((row, index) => (
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
              <Box component="td" sx={{ padding: 2 }}>{row.poNo}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.vendor}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.poDate}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.item}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.poValue}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.reason}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.submittedBy}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PoHistoryTable;
