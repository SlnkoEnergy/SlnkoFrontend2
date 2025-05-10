import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const HandOverApproval = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.slnkoprotrac.com/v1/get-all-handover-sheet')
      .then((response) => {
        const rawData = response.data.Data; // ✅ FIX: get the actual array
        console.log("📥 API Raw Data:", rawData);

        const apiData = rawData.map((item, index) => {
          const mappedItem = {
            id: item.id || item._id || index + 1,
            submitted: false,
            projectId: item.customer_details?.code || '-',
            customer: item.customer_details?.name || '-', // using `name` here
            mobile: item.customer_details?.number || '-',
            state: item.customer_details?.state || '-',
            type: item.project_detail?.project_type || '-',
            capacity: item.project_detail?.project_kwp
              ? `${item.project_detail.project_kwp} kWp`
              : '-',
            charges: item.commercial_details?.subsidy_amount || 'N/A',
            status: item.attached_details?.project_status || 'N/A',
          };

          console.log("✅ Mapped Row:", mappedItem);
          return mappedItem;
        });

        setData(apiData);
      })
      .catch((error) => {
        console.error('❌ Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (id) => {
    const updated = data.map((row) =>
      row.id === id ? { ...row, submitted: true } : row
    );
    setData(updated);
  };

  const filteredData = data.filter((row) =>
    row.projectId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={4} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        HandOver Approval
      </Typography>

      <Box
  sx={{
    mb: 3,
    display: 'flex',
    justifyContent: 'flex-start',
  }}
>
  <TextField
    fullWidth
    placeholder="Search by Project ID, Customer, or Name"
    variant="outlined"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    sx={{
      backgroundColor: 'white',
      borderRadius: 2,
      boxShadow: 1,
      '& .MuiOutlinedInput-root': {
        height: 40, // Reduced height
        fontSize: '0.9rem',
        borderRadius: 2,
        paddingRight: '8px',
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: '#1976d2' }} />
        </InputAdornment>
      ),
    }}
  />
</Box>


      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              {[
                'Project Id',
                'Customer',
                'Mobile',
                'State',
                'Type',
                'Capacity (AC/DC)',
                'Service Charges (with GST)',
                'Action',
                'Submit',
              ].map((head) => (
                <TableCell key={head} sx={{ color: 'white', fontWeight: 'bold' }}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.projectId}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.capacity}</TableCell>
                <TableCell>{row.charges}</TableCell>
                
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => alert('Edit clicked')}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Approve">
                    <IconButton color="success" onClick={() => alert('Approved')}>
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Disapprove">
                    <IconButton color="error" onClick={() => alert('Disapproved')}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={row.submitted ? 'success' : 'primary'}
                    disabled={row.submitted}
                    onClick={() => handleSubmit(row.id)}
                    size="small"
                  >
                    {row.submitted ? 'Submitted' : 'Submit'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HandOverApproval;
