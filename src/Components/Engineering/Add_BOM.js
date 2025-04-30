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
  FormLabel,
  Input
} from '@mui/joy';
import axios from 'axios';
import Img1 from '../../Assets/Add New Module.png';

const dropdownOptions = {
  category: ['Module Materials', 'Inverter Materials', 'Tranfo Materials', 'LT Panel', 'HT Panel', 'AC Cable', 'DC Cable'],
  itemName: ['MC4 Connector', 'Module Mounting Structure', 'Cable Tie', 'ACDB', 'DCDB'],
  make: ['Slnko', 'Client', 'Other'],
  rating: ['1kW', '2kW', '5kW'],
  voltageRating: ['110V', '230V', '415V'],
  uom: ['Nos', 'Mtr', 'Set'],
  quantity: Array.from({ length: 100 }, (_, i) => (i + 1).toString())
};

const AddBOMForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    make: '',
    rating: '',
    voltageRating: '',
    core: '',
    size: '',
    quantity: '',
    uom: ''
  });

  const [makeOptions, setMakeOptions] = useState([]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'category') {
      if (value === 'Module Materials') {
        fetchMakeOptionsByCategory();
      } else {
        setMakeOptions([]);
      }
    }
  };

  const fetchMakeOptionsByCategory = async () => {
    try {
      const response = await axios.get('https://api.slnkoprotrac.com/v1/get-module-master');
      const makes = [...new Set(response.data.data.map(item => item.make).filter(Boolean))];
      setMakeOptions(makes);
    } catch (error) {
      console.error('Error fetching make options:', error);
      setMakeOptions([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        bom: [formData]
      };
      const response = await axios.post('https://api.slnkoprotrac.com/v1/add-bom-master', payload);
      console.log('BOM submitted:', response.data);
    } catch (error) {
      console.error('Error submitting BOM:', error);
    }
  };

  const { category } = formData;
  const isDCCable = category === 'DC Cable';
  const isACCable = category === 'AC Cable';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ bgcolor: 'background.body' }}>
      <Card variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 800 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography level="h4">Add Bill of Materials (BOM)</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
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
            {/* Static fields excluding "make" */}
            {['category', 'itemName', 'quantity', 'uom'].map((field) => (
              <Grid xs={12} sm={6} key={field}>
                <FormLabel>{field === 'uom' ? 'Unit of Measurement (UOM)' : field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                <Select
                  value={formData[field]}
                  onChange={(e, val) => handleChange(field, val)}
                  placeholder={`Select ${field}`}
                  required
                >
                  {dropdownOptions[field].map((option, i) => (
                    <Option key={i} value={option}>{option}</Option>
                  ))}
                </Select>
              </Grid>
            ))}

            {/* Dynamic Make field */}
            <Grid xs={12} sm={6}>
              <FormLabel>Make</FormLabel>
              <Select
                value={formData.make}
                onChange={(e, val) => handleChange('make', val)}
                placeholder="Select Make"
                required
              >
                {(makeOptions.length > 0 ? makeOptions : dropdownOptions.make).map((option, i) => (
                  <Option key={i} value={option}>{option}</Option>
                ))}
              </Select>
            </Grid>

            {/* Rating (only for non DC/AC cable) */}
            {!isDCCable && !isACCable && (
              <Grid xs={12} sm={6}>
                <FormLabel>Rating</FormLabel>
                <Select
                  value={formData.rating}
                  onChange={(e, val) => handleChange('rating', val)}
                  placeholder="Select Rating"
                >
                  {dropdownOptions.rating.map((option, i) => (
                    <Option key={i} value={option}>{option}</Option>
                  ))}
                </Select>
              </Grid>
            )}

            {/* Core and Size for DC/AC Cable */}
            {(isDCCable || isACCable) && (
              <>
                <Grid xs={12} sm={6}>
                  <FormLabel>Core</FormLabel>
                  <Input
                    value={formData.core}
                    onChange={(e) => handleChange('core', e.target.value)}
                    placeholder="Enter Core"
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormLabel>Size</FormLabel>
                  <Input
                    value={formData.size}
                    onChange={(e) => handleChange('size', e.target.value)}
                    placeholder="Enter Size"
                  />
                </Grid>
              </>
            )}

            {/* Voltage Rating (only for AC Cable) */}
            {isACCable && (
              <Grid xs={12} sm={6}>
                <FormLabel>Voltage Rating</FormLabel>
                <Select
                  value={formData.voltageRating}
                  onChange={(e, val) => handleChange('voltageRating', val)}
                  placeholder="Select Voltage Rating"
                >
                  {dropdownOptions.voltageRating.map((option, i) => (
                    <Option key={i} value={option}>{option}</Option>
                  ))}
                </Select>
              </Grid>
            )}

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
