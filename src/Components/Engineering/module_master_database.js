import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const steps = [
  'Module Details',
  'Technical Data',
  'Temperature Coefficients',
  'Dimensions',
  'Status',
];

const AddModuleForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    make: '',
    power: '',
    type: '',
    modelNo: '',
    vmp: '',
    imp: '',
    voc: '',
    isc: '',
    alpha: '',
    beta: '',
    gamma: '',
    length: '',
    width: '',
    thickness: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    // Submit API call
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3} px={2}>
            <Grid item xs={6}><InputLabel>Make</InputLabel><input style={inputStyle} name="make" value={formData.make} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Power (Wp)</InputLabel><input style={inputStyle} name="power" value={formData.power} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Type</InputLabel><input style={inputStyle} name="type" value={formData.type} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Model No.</InputLabel><input style={inputStyle} name="modelNo" value={formData.modelNo} onChange={handleChange} /></Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3} px={2}>
            <Grid item xs={6}><InputLabel>Vmp (V)</InputLabel><input style={inputStyle} name="vmp" value={formData.vmp} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Imp (I)</InputLabel><input style={inputStyle} name="imp" value={formData.imp} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Voc (V)</InputLabel><input style={inputStyle} name="voc" value={formData.voc} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Isc (I)</InputLabel><input style={inputStyle} name="isc" value={formData.isc} onChange={handleChange} /></Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3} px={2}>
            <Grid item xs={6}><InputLabel>α (Isc)</InputLabel><input style={inputStyle} name="alpha" value={formData.alpha} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>β (Voc)</InputLabel><input style={inputStyle} name="beta" value={formData.beta} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>γ (Pmax)</InputLabel><input style={inputStyle} name="gamma" value={formData.gamma} onChange={handleChange} /></Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={3} px={2}>
            <Grid item xs={6}><InputLabel>Length</InputLabel><input style={inputStyle} name="length" value={formData.length} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Width</InputLabel><input style={inputStyle} name="width" value={formData.width} onChange={handleChange} /></Grid>
            <Grid item xs={6}><InputLabel>Thickness</InputLabel><input style={inputStyle} name="thickness" value={formData.thickness} onChange={handleChange} /></Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={3} px={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} onChange={handleChange}>
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Not Available">Not Available</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        margin: '0 auto',
        p: 4,
        borderRadius: 3,
        bgcolor: '#fdfafa',
        boxShadow: 2,
      }}
    >
      <Box textAlign="center" mb={3}>
        <IconButton color="primary">
          <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" mt={1}>Add New Module</Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{`${(index + 1).toString().padStart(2, '0')} ${label}`}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>{renderStepContent(activeStep)}</Paper>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddModuleForm;
