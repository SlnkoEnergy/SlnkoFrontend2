import React, { useState } from 'react';
import axios from 'axios';
import Img1 from '../../Assets/Add New Module.png';
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
} from '@mui/joy';

const AddNewModuleForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    power: '',
    type: '',
    model: '',
    status: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    try {
      const response = await axios.post('https://api.slnkoprotrac.com/v1/add-module-master', formData);
      console.log('Response:', response.data);
      alert('Module added successfully!');
      setFormData({
        make: '',
        power: '',
        type: '',
        model: '',
        status: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed.');
    }
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
          Add Module
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img
            src={Img1}
            width="40px"
            height="40px"
            alt="Module"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Make</FormLabel>
                <Input
                  value={formData.make}
                  onChange={(e) => handleChange('make', e.target.value)}
                  placeholder="Enter Make"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Rating</FormLabel>
                <Input
                  value={formData.power}
                  onChange={(e) => handleChange('power', e.target.value)}
                  placeholder="Enter Rating"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Specification</FormLabel>
                <Input
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  placeholder="Enter Specification"
                  required
                />
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel sx={{ fontSize: 'lg' }}>Model No</FormLabel>
                <Input
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  placeholder="Enter Model No"
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
<Option value="Available" sx={{ color: 'green' }}>Available</Option>
<Option value="Not Available" sx={{ color: 'red' }}>Not Available</Option>

</Select>

              </FormControl>
            </Grid>

            <Grid xs={12}>
              <Button type="submit" variant="solid" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Sheet>
    </Box>
  );
};

export default AddNewModuleForm;