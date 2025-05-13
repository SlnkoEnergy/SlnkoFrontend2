import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const HandOverApproval = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [comment, setComment] = useState("");

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [rowToApprove, setRowToApprove] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.slnkoprotrac.com/v1/get-all-handover-sheet")
      .then((response) => {
        const rawData = response.data.Data;

        const apiData = rawData.map((item, index) => ({
          id: item.id || item._id || index + 1,
          submitted: false,
          status: "Pending",
          projectId: item.customer_details?.code || "-",
          customer: item.customer_details?.name || "-",
          mobile: item.customer_details?.number || "-",
          state: item.customer_details?.state || "-",
          type: item.project_detail?.project_type || "-",
          capacity: item.project_detail?.project_kwp
            ? `${item.project_detail.project_kwp} kWp`
            : "-",
          charges: item.commercial_details?.subsidy_amount || "N/A",
        }));

        setData(apiData);
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error);
      });
  }, []);

  const handleDisapproveClick = (id) => {
    setSelectedRowId(id);
    setComment("");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedRowId(null);
    setComment("");
  };

  const handleCommentSubmit = () => {
    const updated = data.map((row) =>
      row.id === selectedRowId
        ? { ...row, status: "Disapproved", disapproveComment: comment }
        : row
    );
    setData(updated);
    setDialogOpen(false);
    setSelectedRowId(null);
    setComment("");
  };

  const handleConfirmApprove = () => {
    const updated = data.map((row) =>
      row.id === rowToApprove
        ? { ...row, status: "Approved", submitted: true }
        : row
    );
    setData(updated);
    setConfirmationOpen(false);
    setRowToApprove(null);
  };

  const filteredData = data.filter((row) => {
    const query = search.toLowerCase();
    return (
      row.projectId?.toLowerCase().includes(query) ||
      row.customer?.toLowerCase().includes(query) ||
      row.state?.toLowerCase().includes(query) ||
      row.status?.toLowerCase().includes(query)
    );
  });

  return (
    <Box p={4} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        HandOver Approval
      </Typography>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by Project ID, Customer, State, or Status"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            "& .MuiOutlinedInput-root": {
              height: 40,
              fontSize: "0.9rem",
              borderRadius: 2,
              paddingRight: "8px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#1976d2" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              {[
                "Project Id",
                "Customer",
                "Mobile",
                "State",
                "Type",
                "Capacity (AC/DC)",
                "Service Charges (with GST)",
                "Approval Status",
                "Action",
              ].map((head) => (
                <TableCell
                  key={head}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://api.slnkoprotrac.com/v1/handover-sheet/${row.id}`,
                        "_blank"
                      )
                    }
                    sx={{
                      textTransform: "none",
                      padding: 0,
                      minWidth: "auto",
                      color: "#1976d2",
                      textDecoration: "underline",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      "&:hover": {
                        backgroundColor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {row.projectId}
                  </Button>
                </TableCell>

                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.capacity}</TableCell>
                <TableCell>{row.charges}</TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color:
                        row.status === "Approved"
                          ? "green"
                          : row.status === "Disapproved"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => alert("Edit clicked")}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Approve">
                    <IconButton
                      color="success"
                      onClick={() => {
                        setRowToApprove(row.id);
                        setConfirmationOpen(true);
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Disapprove">
                    <IconButton
                      color="error"
                      onClick={() => handleDisapproveClick(row.id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Disapprove Comment Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reason for Disapproval</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter the reason for disapproval..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCommentSubmit}
            color="error"
            variant="contained"
          >
            Submit Reason
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Approve Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit this handover?
          </Typography>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => setConfirmationOpen(false)} color="error">
            <CancelIcon />
          </IconButton>
          <Button
            variant="contained"
            color="success"
            onClick={handleConfirmApprove}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HandOverApproval;
