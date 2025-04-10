import React, { useState } from 'react';
import axios from 'axios';
import Img1 from '../../Assets/Add New Module.png'; // Update if you have a specific inverter icon
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Typography,
  Sheet,
  Grid,
  Stack,
} from '@mui/joy';

const AddNewInverterForm = () => {
  const [formData, setFormData] = useState({
    inveter_make: '',
    inveter_model: '',
    inveter_type: '',
    inveter_size: '',
    status: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      const response = await axios.post('https://api.slnkoprotrac.com/v1/add-inveter-master', formData);
      console.log('Response:', response.data);
      alert('Inverter added successfully!');
      setFormData({
        inveter_make: '',
        inveter_model: '',
        inveter_type: '',
        inveter_size: '',
        status: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed.');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        p: 2,
      }}
    >
      <Sheet
        sx={{
          width: 800,
          p: 4,
          borderRadius: 'lg',
          boxShadow: 'lg',
          backgroundColor: '#fff',
        }}
      >
        <Typography level="h3" textAlign="center" mb={1}>
          Add Inverter
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img
            src={Img1}
            width="40px"
            height="40px"
            alt="Inverter"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Make</FormLabel>
                <Input
                  value={formData.inveter_make}
                  onChange={(e) => handleChange('inveter_make', e.target.value)}
                  placeholder="Enter Make"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Model</FormLabel>
                <Input
                  value={formData.inveter_model}
                  onChange={(e) => handleChange('inveter_model', e.target.value)}
                  placeholder="Enter Model"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Type</FormLabel>
                <Input
                  value={formData.inveter_type}
                  onChange={(e) => handleChange('inveter_type', e.target.value)}
                  placeholder="Enter Type"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Size</FormLabel>
                <Input
                  value={formData.inveter_size}
                  onChange={(e) => handleChange('inveter_size', e.target.value)}
                  placeholder="Enter Size"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={(_, value) => handleChange('status', value)}
                  placeholder="Select Status"
                  required
                  sx={{
                    color:
                      formData.status === 'Available'
                        ? 'green'
                        : formData.status === 'Not Available'
                        ? 'red'
                        : 'inherit',
                    borderColor:
                      formData.status === 'Available'
                        ? 'green'
                        : formData.status === 'Not Available'
                        ? 'red'
                        : 'inherit',
                  }}
                >
                  <Option value="Available" sx={{ color: 'green' }}>
                    Available
                  </Option>
                  <Option value="Not Available" sx={{ color: 'red' }}>
                    Not Available
                  </Option>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button type="button" variant="outlined" color="neutral" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="solid" color="primary">
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Sheet>
    </Box>
  );
};

export default AddNewInverterForm;
