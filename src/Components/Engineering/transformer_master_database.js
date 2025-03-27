import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Autocomplete, Grid, Typography, Sheet, FormLabel, FormControl, Select, Option } from "@mui/joy";

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

  const makeOptions = ["Option 1", "Option 2", "Option 3"];
  const typeOptions = ["OLTC", "OCTC"];
  const vectorGroupOptions = ["YNd11", "YNd11d11"];
  const primaryVoltageOptions = ["11", "33"];
  const voltageVariationOptions = ["±5%", "±10%", "±15%"];
  const voltageRatioOptions = ["11/0.433", "33/11", "33/0.433"];
  const impedanceOptions = ["2%", "4%", "6%", "8%"];
  const statusOptions = ["Available", "Not Available"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutocompleteChange = (name, newValue) => {
    setFormData({ ...formData, [name]: newValue });
  };

  // Calculate Rated Current HV
  useEffect(() => {
    const size = parseFloat(formData.size);
    const primaryVoltage = parseFloat(formData.primary_voltage);

    if (!isNaN(size) && !isNaN(primaryVoltage) && primaryVoltage > 0) {
      const calculatedHV = (size / (1.732 * primaryVoltage)).toFixed(3);
      setFormData((prevData) => ({ ...prevData, ratedCurrentHV: calculatedHV }));
    }
  }, [formData.size, formData.primary_voltage]);

  // Calculate Rated Current LV1 & LV2 based on Vector Group
  useEffect(() => {
    const size = parseFloat(formData.size);
    const secondaryVoltage = parseFloat(formData.secondary_voltage);
    const vectorGroup = formData.vector_group;

    if (!isNaN(size) && !isNaN(secondaryVoltage) && secondaryVoltage > 0) {
      let calculatedLV1 = ((size / 1.732) / secondaryVoltage).toFixed(3);
      let calculatedLV2 = "";

      if (vectorGroup === "YNd11d11") {
        calculatedLV1 = (((size / 1.732) / secondaryVoltage) / 2).toFixed(3);
        calculatedLV2 = calculatedLV1; // LV2 is same as LV1
      }

      setFormData((prevData) => ({
        ...prevData,
        ratedCurrentLV1: calculatedLV1,
        ratedCurrentLV2: calculatedLV2,
      }));
    }
  }, [formData.size, formData.secondary_voltage, formData.vector_group]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.slnkoprotrac.com/v1/add-transformer-master", formData);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Sheet sx={{ maxWidth: 900, mx: "auto", p: 3, borderRadius: "md", boxShadow: "lg" }}>
      <Typography level="h3" sx={{ mb: 3, textAlign: "center" }}>Add New Transformer</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            ["Make", "make", makeOptions, true],
            ["Size", "size"],
            ["Type", "type", typeOptions, false, true],
            ["Vector Group", "vector_group", vectorGroupOptions, true],
            ["Cooling Type", "cooling_type"],
            ["Primary Voltage", "primary_voltage", primaryVoltageOptions, false, true],
            ["Voltage Variation", "voltage_variation", voltageVariationOptions, false, true],
            ["Secondary Voltage", "secondary_voltage"],
            ["Voltage Ratio", "voltage_ratio", voltageRatioOptions, false, true],
            ["Rated Current HV", "ratedCurrentHV"],
            ["Rated Current LV1", "ratedCurrentLV1"],
            ["Rated Current LV2", "ratedCurrentLV2"],
            ["% Impedance", "impedance", impedanceOptions, true],
            ["Winding Material", "winding_material"],
            ["Status", "status", statusOptions, false, true],
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
                      <Option key={option} value={option}>{option}</Option>
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
                  <Input
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    disabled={name === "ratedCurrentLV2" && formData.vector_group === "YNd11"} // Disable LV2 if Vector Group is "YNd11"
                  />
                )}
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" sx={{ mt: 3, width: "100%" }}>Submit</Button>
      </form>
    </Sheet>
  );
};

export default AddNewTransformerForm;
