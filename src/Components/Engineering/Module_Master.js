import React, { useState } from 'react';
import axios from 'axios';
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
  Stack,
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
    <Sheet
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 'lg',
        boxShadow: 'md',
      }}
    >
      <Typography level="h4" textAlign="center" mb={2}>
        Add Module
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Make</FormLabel>
            <Input
              value={formData.make}
              onChange={(e) => handleChange('make', e.target.value)}
              placeholder="Enter Make"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Input
              value={formData.power}
              onChange={(e) => handleChange('power', e.target.value)}
              placeholder="Enter Rating"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Specification</FormLabel>
            <Input
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="Enter Specification"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Model No</FormLabel>
            <Input
              value={formData.model}
              onChange={(e) => handleChange('model', e.target.value)}
              placeholder="Enter Model No"
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              value={formData.status}
              onChange={(_, value) => handleChange('status', value)}
              placeholder="Select Status"
              required
            >
              <Option value="Available">Available</Option>
              <Option value="Not Available">Not Available</Option>
            </Select>
          </FormControl>

          <Button type="submit" variant="solid" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Sheet>
  );
};

export default AddNewModuleForm;
