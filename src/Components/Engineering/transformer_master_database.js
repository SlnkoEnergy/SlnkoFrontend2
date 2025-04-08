import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Autocomplete,
  Grid,
  Typography,
  Sheet,
  FormLabel,
  FormControl,
  Select,
  Option,
} from "@mui/joy";

const AddNewTransformerForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    size: "",
    type: "",
    vector_group: "",
    cooling_type: "",
    primary_voltage: "",
    voltage_variation: "",
    secondary_voltage: "",
    voltage_ratio: "",
    ratedCurrentHV: "",
    ratedCurrentLV1: "",
    ratedCurrentLV2: "",
    impedance: "",
    winding_material: "",
    status: "",
    submitted_By: "Admin",
  });

  // State variables for dropdown options
  const [makeOptions, setMakeOptions] = useState([]);
  const [impedanceOptions, setImpedanceOptions] = useState([]);
  const [vectorGroupOptions, setVectorGroupOptions] = useState([]);

  const fetchDropdownData = async () => {
    try {
      const response = await axios.get("https://api.slnkoprotrac.com/v1/get-transformer-options");
  
      console.log("API Full Response:", response); // Logs full response
      console.log("API Data:", response.data); // Logs actual response data
  
      // Ensure response.data is an array
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response format: Expected an array");
      }
  
      // Debugging: Print first data entry to check keys
      if (response.data.length > 0) {
        console.log("First Entry Sample:", response.data[0]);
      }
  
      // Extract unique values (Check for correct key names)
      const makes = [...new Set(response.data.map(item => item?.make).filter(Boolean))];
      const vectorGroups = [...new Set(response.data.map(item => item?.vector_group).filter(Boolean))];
      const impedances = [...new Set(response.data.map(item => item?.impedance).filter(Boolean))];
  
      console.log("✅ Extracted Make Options:", makes);
      console.log("✅ Extracted Vector Group Options:", vectorGroups);
      console.log("✅ Extracted Impedance Options:", impedances);
  
      setMakeOptions(makes);
      setVectorGroupOptions(vectorGroups);
      setImpedanceOptions(impedances);
  
    } catch (error) {
      console.error("❌ Error fetching dropdown data:", error.response ? error.response.data : error.message);
    }
  };
  
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(`Updated Form Field - ${e.target.name}:`, e.target.value);
  };

  const handleAutocompleteChange = (name, newValue) => {
    setFormData({ ...formData, [name]: newValue });
    console.log(`Updated Dropdown Field - ${name}:`, newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);

    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/add-transformer-master",
        formData
      );
      console.log("Form Submission Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Sheet sx={{ maxWidth: 900, mx: "auto", p: 3, borderRadius: "md", boxShadow: "lg" }}>
      <Typography level="h3" sx={{ mb: 3, textAlign: "center" }}>
        Add New Transformer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            ["Make", "make", makeOptions, true],
            ["Size", "size"],
            ["Type", "type"],
            ["Vector Group", "vector_group", vectorGroupOptions, true],
            ["Cooling Type", "cooling_type"],
            ["Primary Voltage", "primary_voltage", ["11", "33"], false, true],
            ["Voltage Variation", "voltage_variation", ["±5%", "±10%", "±15%"], false, true],
            ["Secondary Voltage", "secondary_voltage"],
            ["Voltage Ratio", "voltage_ratio", ["11/0.433", "33/11", "33/0.433"], false, true],
            ["Rated Current HV", "ratedCurrentHV"],
            ["Rated Current LV1", "ratedCurrentLV1"],
            ["Rated Current LV2", "ratedCurrentLV2"],
            ["% Impedance", "impedance", impedanceOptions, true],
            ["Winding Material", "winding_material"],
            ["Status", "status", ["Available", "Not Available"], false, true],
          ].map(([label, name, options, isAutocomplete, isSelect], index) => (
            <Grid xs={4} key={index}>
              <FormControl>
                <FormLabel>{label}</FormLabel>
                {isSelect ? (
                  <Select
                    name={name}
                    value={formData[name]}
                    onChange={(e, newValue) => handleAutocompleteChange(name, newValue)}
                  >
                    {options.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                ) : isAutocomplete ? (
                  <Autocomplete
                    options={options}
                    value={formData[name]}
                    onChange={(e, newValue) => handleAutocompleteChange(name, newValue)}
                    renderInput={(params) => <Input {...params} name={name} />}
                    freeSolo
                  />
                ) : (
                  <Input name={name} value={formData[name]} onChange={handleChange} />
                )}
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" sx={{ mt: 3, width: "100%" }}>
          Submit
        </Button>
      </form>
    </Sheet>
  );
};

export default AddNewTransformerForm;
