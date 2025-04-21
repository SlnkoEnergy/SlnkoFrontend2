import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Select,
  Option,
  FormLabel
} from '@mui/joy';
import axios from 'axios';
import Img1 from '../../Assets/Add New Module.png';

const dropdownOptions = {
  category: ['Solar Panel', 'Inverter', 'Structure'],
  make: ['Slnko', 'Client', 'Other'],
  rating: ['1kW', '2kW', '5kW'],
  specification: ['Mono Perc', 'Poly', 'Bi-facial'],
  uom: ['Nos', 'Mtr', 'Set'],
  quantity: Array.from({ length: 100 }, (_, i) => (i + 1).toString())
};

const AddBOMForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    make: '',
    rating: '',
    specification: '',
    quantity: '',
    uom: ''
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://api.slnkoprotrac.com/v1/add-bom-master', {
        bom: [formData]
      });
      console.log('BOM submitted:', response.data);
      // Optional: reset form or show success message
    } catch (error) {
      console.error('Error submitting BOM:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: 'background.body' }}
    >
      <Card variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 800 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography level="h4">Add Bill of Materials (BOM)</Typography>
        </Box>
         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, marginBottom: '10px' }}>
                  <img
                    src={Img1}
                    width="30px"
                    height="30px"
                    alt="Module"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
        <CardContent>
          <Grid container spacing={2}>
            {[
              { field: 'category', label: 'Category' },
              { field: 'make', label: 'Make' },
              { field: 'rating', label: 'Rating' },
              { field: 'specification', label: 'Specification' },
              { field: 'quantity', label: 'Quantity' },
              { field: 'uom', label: 'Unit of Measurement (UOM)' }
            ].map(({ field, label }) => (
              <Grid xs={12} sm={6} key={field}>
                <FormLabel>{label}</FormLabel>
                <Select
                  value={formData[field]}
                  onChange={(e, val) => handleChange(field, val)}
                  placeholder={`Select ${label}`}
                  required
                >
                  {dropdownOptions[field].map((option, i) => (
                    <Option key={i} value={option}>{option}</Option>
                  ))}
                </Select>
              </Grid>
            ))}
            <Grid xs={12} display="flex" justifyContent="space-between" gap={2}>
              <Button
                variant="outlined"
                color="neutral"
                sx={{
                  width: '48%',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  backgroundColor: '#f2f2f2',
                  '&:hover': {
                    backgroundColor: '#e0e0e0'
                  }
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                variant="solid"
                color="success"
                sx={{
                  width: '48%',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#45a049'
                  }
                }}
              >
                Submit BOM
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddBOMForm;
