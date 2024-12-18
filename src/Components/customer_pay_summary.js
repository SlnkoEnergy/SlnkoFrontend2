import React, { useState,useEffect } from 'react';
import { Container, Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Divider, TextField } from '@mui/material';
import { Paper } from '@mui/material';
import Img12 from '../Assets/slnko_blue_logo.png';
import axios from 'axios';

const CustomerPaymentSummary = () => {
  // Example data to replace PHP variables
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState({
    code: "",
    name: "",
    customer: "",
    p_group: "",
    billing_address: "",
    project_kwp: "",
  });

 
  const creditHistory = [
    {
      id: 1,
      cr_date: '2023-12-01',
      cr_mode: 'Bank Transfer',
      cr_amount: 5000,
    },
    {
      id: 2,
      cr_date: '2023-12-05',
      cr_mode: 'Cash',
      cr_amount: 3000,
    },
  ];

  const debitHistory = [
    {
      id: 1,
      dbt_date: '2023-12-10',
      pay_mode: 'Cheque',
      paid_for: 'Materials',
      vendor: 'ABC Supplies',
      amount_paid: 1500,
      utr: 'UTR12345',
    },
    {
      id: 2,
      dbt_date: '2023-12-11',
      pay_mode: 'Bank Transfer',
      paid_for: 'Labor',
      vendor: 'XYZ Services',
      amount_paid: 2000,
      utr: 'UTR67890',
    },
  ];

  const adjustmentHistory = [
    {
      id: 1,
      date: '2023-12-12',
      adjusted_from: 'ABC Supplies',
      adjusted_for: 'Materials',
      value: 1500,
    },
    {
      id: 2,
      date: '2023-12-13',
      adjusted_from: 'XYZ Services',
      adjusted_for: 'Labor',
      value: -500,
    },
  ];

  const balanceSummary = [{
     crAmt : "300",
     totalReturn : "100",
     totalAdvanceValue : "140",
     totalPoValue : "500",
     totalBilled : "350",
     dbAmt : "150",
     adjTotal : "50",
  }];

   // Extract values from balanceSummary
   const { crAmt, totalReturn, totalAdvanceValue, totalPoValue, totalBilled, dbAmt, adjTotal } = balanceSummary[0];


  const netBalance = crAmt - totalReturn;
  const balanceSlnko = netBalance - totalAdvanceValue;
  const netAdvance = totalAdvanceValue - totalBilled;
  const balancePayable = totalPoValue - totalBilled - netAdvance;

  // TCS Calculation (if applicable)
  const tcs = netBalance > 5000000 ? (netBalance - 5000000) * 0.001 : 0;
  const balanceRequired = balanceSlnko - balancePayable - tcs;

  // Final calculation of available balance
  const crAmtNum = Number(crAmt);
const dbAmtNum = Number(dbAmt);
const adjTotalNum = Number(adjTotal);
  const totalAmount = (crAmtNum - dbAmtNum) + adjTotalNum;
  

  const [selectedCredits, setSelectedCredits] = useState([]);

  const [debitSearch, setDebitSearch] = useState('');
  const [selectedDebits, setSelectedDebits] = useState([]);
  const [filteredDebits, setFilteredDebits] = useState(debitHistory);

  const totalDebited = debitHistory.reduce((sum, item) => sum + item.amount_paid, 0);

  const [selectedAdjustments, setSelectedAdjustments] = useState([]);

  const totalAdjustment = adjustmentHistory.reduce((sum, item) => sum + item.value, 0);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setDebitSearch(searchValue);

    const filtered = debitHistory.filter((item) =>
        item.paid_for.toLowerCase().includes(searchValue)
      );
      setFilteredDebits(filtered);
    };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedCredits(creditHistory.map((item) => item.id));
    } else {
      setSelectedCredits([]);
    }
  };

  const handleSelectAllDebits = (event) => {
    if (event.target.checked) {
      setSelectedDebits(filteredDebits.map((item) => item.id));
    } else {
      setSelectedDebits([]);
    }
  };


  const handleCheckboxChange = (id) => {
    setSelectedCredits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDebitCheckboxChange = (id) => {
    setSelectedDebits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllAdjustments = (event) => {
    if (event.target.checked) {
      setSelectedAdjustments(adjustmentHistory.map((item) => item.id));
    } else {
      setSelectedAdjustments([]);
    }
  };

  const handleAdjustmentCheckboxChange = (id) => {
    setSelectedAdjustments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  useEffect(() => {
      const fetchProjectData = async () => {
        try {
         
          const response = await axios.get("https://backendslnko.onrender.com/v1/get-all-project");
          const data = response.data?.data?.[0];
  
          if (data) {
            setProjectData((prev) => ({
              ...prev,
              code: data.code || "",
              name: data.name || "",
              customer: data.customer || "",
              p_group: data.p_group || "",
              billing_address: data.billing_address || "",
              project_kwp: data.project_kwp || "",

            }));
          } else {
            setError("No projects found. Please add projects before proceeding.");
          }
        } catch (err) {
          console.error("Error fetching project data:", err);
          setError("Failed to fetch project data. Please try again later.");
        } 
       
      };
  
      fetchProjectData();
    }, []);

  return (
    <Container maxWidth="xl" style={{ border: '1px solid black', padding: '20px' }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <img src={Img12 }style={{ }} />
        </Box>
        <Typography variant="h4" fontFamily="Playfair Display" fontWeight={600}>
          Customer Payment Summary
        </Typography>
        <Box textAlign="center">
          <Typography variant="subtitle1" fontFamily="Bona Nova SC">
            Monday
          </Typography>
          <Typography variant="subtitle1" fontFamily="Bona Nova SC">
            December 12, 2024
          </Typography>
        </Box>
      </Box>

      {/* Project Details Section */}
      <Typography variant="h5" fontWeight={500} fontFamily="Playfair Display" mt={2} mb={1}>
        Project Details
      </Typography>
      <Divider style={{ borderWidth: '2px', marginBottom: '20px' }} />

      <form>
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <TextField
              fullWidth
              label="Project ID"
              value={projectData.code}
              InputProps={{ readOnly: true }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              fullWidth
              label="Project Name"
              value={projectData.name}
              InputProps={{ readOnly: true }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              fullWidth
              label="Client Name"
              value={projectData.customer}
              InputProps={{ readOnly: true }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <TextField
              fullWidth
              label="Group Name"
              value={projectData.p_group}
              InputProps={{ readOnly: true }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              fullWidth
              label="Plant Location"
              value={projectData.billing_address}
              InputProps={{ readOnly: true }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              fullWidth
              label="Plant Capacity"
              value={projectData.project_kwp}
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Box>
      </form>

      {/* Credit History Section */}
      <Typography variant="h5" fontFamily="Playfair Display" fontWeight={600} mt={4} mb={2}>
        Credit History
      </Typography>
      <Divider style={{ borderWidth: '2px', marginBottom: '20px' }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Credit History</Typography>
        <Button variant="contained" color="error">
          Delete Selected
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Credit Date</TableCell>
            <TableCell>Credit Mode</TableCell>
            <TableCell>Credited Amount (₹)</TableCell>
            <TableCell>
              <Checkbox
                color="primary"
                onChange={handleSelectAll}
                checked={selectedCredits.length === creditHistory.length}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {creditHistory.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{new Date(row.cr_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
              <TableCell>{row.cr_mode}</TableCell>
              <TableCell>₹ {row.cr_amount.toLocaleString('en-IN')}</TableCell>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={selectedCredits.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} align="right">
              <Typography variant="h6" color="success.main">
                Total Credited: 
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Debit History Section */}
      <Typography variant="h5" fontFamily="Playfair Display" fontWeight={600} mt={4} mb={2}>
        Debit History
      </Typography>
      <Divider style={{ borderWidth: '2px', marginBottom: '20px' }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search Paid For"
          value={debitSearch}
          onChange={handleSearch}
          style={{ width: '250px' }}
        />
        <Button variant="contained" color="error" disabled={selectedDebits.length === 0}>
          Delete Selected
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Debit Date</TableCell>
            <TableCell>Debit Mode</TableCell>
            <TableCell>Paid For</TableCell>
            <TableCell>Paid To</TableCell>
            <TableCell>Debited Amount (₹)</TableCell>
            <TableCell>UTR</TableCell>
            <TableCell>
              <Checkbox
                color="primary"
                onChange={handleSelectAllDebits}
                checked={selectedDebits.length === filteredDebits.length && filteredDebits.length > 0}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredDebits.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {new Date(row.dbt_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </TableCell>
              <TableCell>{row.pay_mode}</TableCell>
              <TableCell>{row.paid_for}</TableCell>
              <TableCell>{row.vendor}</TableCell>
              <TableCell>₹ {row.amount_paid.toLocaleString('en-IN')}</TableCell>
              <TableCell>{row.utr}</TableCell>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={selectedDebits.includes(row.id)}
                  onChange={() => handleDebitCheckboxChange(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} align="right">
              <Typography variant="h6" color="error.main">
                Total Debited: ₹ {totalDebited.toLocaleString('en-IN')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/*Adjustment History Section */}
       <Typography variant="h5" fontFamily="Playfair Display" fontWeight={600} mt={4} mb={2}>
        Adjustment History
      </Typography>
      <Divider style={{ borderWidth: '2px', marginBottom: '20px' }} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button variant="contained" color="error" disabled={selectedAdjustments.length === 0}>
          Delete Selected
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Adjustment Date</TableCell>
            <TableCell>Adjusted From</TableCell>
            <TableCell>Adjusted For</TableCell>
            <TableCell>Credit (₹)</TableCell>
            <TableCell>Debit (₹)</TableCell>
            <TableCell>
              <Checkbox
                color="primary"
                onChange={handleSelectAllAdjustments}
                checked={
                  selectedAdjustments.length === adjustmentHistory.length && adjustmentHistory.length > 0
                }
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adjustmentHistory.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </TableCell>
              <TableCell>{row.adjusted_from}</TableCell>
              <TableCell>{row.adjusted_for}</TableCell>
              <TableCell>{row.value > 0 ? `₹ ${row.value.toLocaleString('en-IN')}` : ''}</TableCell>
              <TableCell>{row.value < 0 ? `₹ ${Math.abs(row.value).toLocaleString('en-IN')}` : ''}</TableCell>
              <TableCell>
                <Checkbox
                  color="primary"
                  checked={selectedAdjustments.includes(row.id)}
                  onChange={() => handleAdjustmentCheckboxChange(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} align="right">
              <Typography variant="h6" color="primary.main">
                Total Adjustment: ₹ {totalAdjustment.toLocaleString('en-IN')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <hr />
        {/* Balance Summary and Amount Available Section */}
<Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
  {/* Balance Summary Table */}
  <Table component={Paper} style={{ width: '48%' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>S.No.</TableCell>
          <TableCell>Balance Summary</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell><strong>Total Received:</strong></TableCell>
          <TableCell>{crAmtNum}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell><strong>Total Return:</strong></TableCell>
          <TableCell>{totalReturn}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell style={{ backgroundColor: '#C8C8C6' }}><strong>Net Balance[(1)-(2)]:</strong></TableCell>
          <TableCell style={{ backgroundColor: '#C8C8C6' }}>{netBalance}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>4</TableCell>
          <TableCell><strong>Total Advance Paid to vendors:</strong></TableCell>
          <TableCell>{totalAdvanceValue}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>5</TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6' }}><strong>Balance With Slnko [(3)-(4)]:</strong></TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6', fontWeight: 'bold' }}>{balanceSlnko}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>6</TableCell>
          <TableCell><strong>Total PO Value:</strong></TableCell>
          <TableCell>{totalPoValue}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>7</TableCell>
          <TableCell><strong>Total Billed Value:</strong></TableCell>
          <TableCell>{totalBilled}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>8</TableCell>
          <TableCell><strong>Net Advance Paid [(4)-(7)]:</strong></TableCell>
          <TableCell>{netAdvance}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>9</TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6' }}><strong>Balance Payable to vendors [(6)-(7)-(8)]:</strong></TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6', fontWeight: 'bold' }}>{balancePayable}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>10</TableCell>
          <TableCell><strong>TCS as applicable:</strong></TableCell>
          <TableCell>{tcs}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>11</TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6' }}><strong>Balance Required [(5)-(9)-(10)]:</strong></TableCell>
          <TableCell style={{ backgroundColor: '#B6F4C6', color: balanceRequired >= 0 ? 'green' : 'red' }}><strong>{balanceRequired}</strong></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Table>

  {/* Amount Available (Old) Table */}
  <Table component={Paper} style={{ width: '48%', alignItems: 'center' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Amount Available (Old)</TableCell>
          <TableCell>Credit - Debit + Adjust</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <Typography variant="h5" component="div">
              <strong className="text-success">{crAmt}</strong> - 
              <strong className="text-danger">{dbAmtNum}</strong> + 
              <strong className="text-primary">{adjTotalNum}</strong>
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow style={{ backgroundColor: '#fff' }}>
          <TableCell><strong>Total</strong></TableCell>
          <TableCell>
            <Typography variant="h5" component="div">
              <strong className={totalAmount >= 0 ? 'text-success' : 'text-danger'}>{totalAmount}</strong>
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Table>
</Box>

    </Container>
  );
};

export default CustomerPaymentSummary;
