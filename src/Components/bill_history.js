import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

function BillHistoryTable() {
  const rows = [
    {
      billDate: "2025-01-10",
      billNo: "B12345",
      billValue: "₹50,000",
      submittedBy: "Rounik",
    },
    {
      billDate: "2025-01-12",
      billNo: "B12346",
      billValue: "₹1,20,000",
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
        Bill History
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
              <Box component="td" sx={{ padding: 2 }}>{row.billDate}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.billNo}</Box>
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
