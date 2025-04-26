import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Typography,
  Card,
  Grid,
} from '@mui/joy';
import axios from 'axios';

const AddNewPoolingStationForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    itemName: '',
    rating: '',
    technicalSpecification: '',
    status: '',
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting:', formData);
      await axios.post('https://your-api-endpoint.com/v1/add-pooling-station', formData);
      alert('Pooling Station Added Successfully!');
      setFormData({
        category: '',
        itemName: '',
        rating: '',
        technicalSpecification: '',
        status: '',
      });
    } catch (error) {
      console.error('Error submitting Pooling Station:', error);
      alert('Failed to submit Pooling Station.');
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
      <Typography level="h4" textAlign="center" mb={3}>
        Add New Pooling Station
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Enter Category"
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                placeholder="Enter Item Name"
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Enter Rating"
                required
              />
            </FormControl>
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl>
              <FormLabel>Technical Specification</FormLabel>
              <Input
                name="technicalSpecification"
                value={formData.technicalSpecification}
                onChange={handleInputChange}
                placeholder="Enter Technical Specification"
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <FormLabel>Status</FormLabel>
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
                }}
              >
                <Option value="Available" sx={{ color: 'green' }}>
                  ✅ Available
                </Option>
                <Option value="Not Available" sx={{ color: 'red' }}>
                  ❌ Not Available
                </Option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Centered Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button type="submit" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default AddNewPoolingStationForm;
