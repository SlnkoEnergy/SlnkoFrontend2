import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import axios from "axios";

function BillHistoryTable() {
  const [billHistoryData, setBillHistoryData] = useState([]);
  const [poNumber, setPoNumber] = useState(null);
  const poId = "677baf379b33fd5b825a899a"; // Replace with dynamic _id if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching PO details...");
        const poResponse = await axios.get(`https://api.slnkoprotrac.com/v1/get-po/${poId}`);
        
        // Assuming the response contains a valid `po_number`
        const fetchedPoNumber = poResponse.data.data.po_number;
        console.log("PO Details fetched successfully:", poResponse.data);
        console.log("Fetched PO Number:", fetchedPoNumber);

        // Set the fetched PO number
        setPoNumber(fetchedPoNumber);

        console.log("Fetching Bill History...");
        const billResponse = await axios.get("https://api.slnkoprotrac.com/v1/get-all-bill");
        console.log("Bill History API Response:", billResponse);

        // Ensure data from get-all-bill is an array
        const billData = Array.isArray(billResponse.data) ? billResponse.data : billResponse.data.data;

        if (!Array.isArray(billData)) {
          throw new Error("Bill history data is not an array.");
        }

        // Filter bill data based on matching po_number
        const matchedBills = billData.filter((bill) => bill.po_number === fetchedPoNumber);
        console.log("Matched Bill Data:", matchedBills);

        // Update state with matched bills
        setBillHistoryData(matchedBills);
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
            {["Bill Number", "Bill Date", "Bill Value", "Submitted By"].map((header, index) => (
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

        {/* Table Body */}
        <Box component="tbody">
          {billHistoryData.length > 0 ? (
            billHistoryData.map((row, index) => (
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
                  {row.bill_number}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.bill_date}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.bill_value}
                </Box>
                <Box component="td" sx={{ padding: 2 }}>
                  {row.submitted_by}
                </Box>
              </Box>
            ))
          ) : (
            <Box
              component="tr"
              sx={{ textAlign: "center", padding: 2, backgroundColor: "neutral.50" }}
            >
              <Box component="td" colSpan={4} sx={{ padding: 2 }}>
                No matching bill data found.
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BillHistoryTable;
