import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

function PoHistoryTable() {
  const [poHistoryData, setPoHistoryData] = useState([]);
  const [poNumber, setPoNumber] = useState(null);
  const poId = "677baf379b33fd5b825a899a"; // Replace with dynamic _id if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching PO details...");
        const poResponse = await axios.get(`https://api.slnkoprotrac.com/v1/get-po/${poId}`);
        
        // Assuming the response from get-po is an object and contains po_number
        const fetchedPoNumber = poResponse.data.data.po_number;
        console.log("PO Details fetched successfully:", poResponse.data);
        console.log("Fetched PO Number:", fetchedPoNumber);

        // Set the fetched po_number
        setPoNumber(fetchedPoNumber);

        console.log("Fetching PO History...");
        const historyResponse = await axios.get("https://api.slnkoprotrac.com/v1/get-po-history");
        console.log("PO History API Response:", historyResponse);

        // Ensure data from get-po-history is an array
        const historyData = Array.isArray(historyResponse.data) ? historyResponse.data : historyResponse.data.data;

        if (!Array.isArray(historyData)) {
          throw new Error("PO history data is not an array.");
        }

        // Filter history data based on matching po_number
        const matchedHistory = historyData.filter((history) => history.po_number === fetchedPoNumber);
        console.log("Matched History Data:", matchedHistory);

        // Update state with matched history
        setPoHistoryData(matchedHistory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [poId]);

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
            {["PO NO.", "Vendor", "PO Date", "Item", "PO Value with GST", "Amendment Reason", "Submitted By"].map(
              (header, index) => (
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
              )
            )}
          </Box>
        </Box>

        {/* Table Body */}
        <Box component="tbody">
          {poHistoryData.length > 0 ? (
            poHistoryData.map((row, index) => (
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
                 <Box component="td" sx={{ padding: 2 }}>{row.po_number}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.vendor}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.date}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.item}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.po_value}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.comment}</Box>
              <Box component="td" sx={{ padding: 2 }}>{row.submitted_By}</Box>
              </Box>
            ))
          ) : (
            <Box
              component="tr"
              sx={{ textAlign: "center", padding: 2, backgroundColor: "neutral.50" }}
            >
              <Box component="td" colSpan={7} sx={{ padding: 2 }}>
                No matching history data found.
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PoHistoryTable;
