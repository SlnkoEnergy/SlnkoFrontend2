import React, { useState,useEffect  } from "react";
import { Box, Button, Grid, Input, Select, Option, Typography, FormControl, FormLabel } from "@mui/joy";
import axios from "axios";

const CommercialForm = () => {
    const [formData, setFormData] = useState({
        offer_id: "",
        client_name: "",
        village: "",
        district: "",
        state: "",
        pincode: "",
        ac_capacity: "",
        dc_overloading: "",
        dc_capacity: "",
        scheme: "",
        component: "",
        rate: "",
        timeline: "",
        prepared_by: "",
        module_type: "",
        module_capacity: "",
        inverter_capacity: "",
        evacuation_voltage: "",
        module_orientation: "",
        transmission_length: "",
        transformer: "",
        column_type: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [submitTrigger, setSubmitTrigger] = useState(false);

   // Handle form submission

      
   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://api.slnkoprotrac.com/v1/get-comm-offer");
            const formattedData = response.data.map(item => ({
                offer_id: item.offer_id || "",
                client_name: item.client_name || "",
                village: item.village || "",
                district: item.district || "",
                state: item.state || "",
                pincode: item.pincode || "",
                ac_capacity: item.ac_capacity || "",
                dc_overloading: item.dc_overloading || "",
                dc_capacity: item.dc_capacity || "",
                scheme: item.scheme || "",
                component: item.component || "",
                rate: item.rate || "",
                timeline: item.timeline || "",
                prepared_by: item.prepared_by || "",
                module_type: item.module_type || "",
                module_capacity: item.module_capacity || "",
                inverter_capacity: item.inverter_capacity || "",
                evacuation_voltage: item.evacuation_voltage || "",
                module_orientation: item.module_orientation || "",
                transmission_length: item.transmission_length || "",
                transformer: item.transformer || "",
                column_type: item.column_type || "",
            }));
             
setFormData(formattedData[34]);
            console.log("Fetched Data:", formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

    const calculateDcCapacity = (ac, dc) => {
        const acValue = parseFloat(ac);
        const dcValue = parseFloat(dc) / 100; // Convert percentage to decimal
        if (!isNaN(acValue) && !isNaN(dcValue)) {
            return (acValue * (1 + dcValue)).toFixed(3);
        }
        return "";
    };
      

    const handleChange = (e, newValue) => {
        if (e && e.target) {
            // Handles text input fields
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        } else if (newValue !== undefined) {
            // Handles MUI Select components (pass name explicitly)
            setFormData(prev => ({
                ...prev,
                [e]: newValue, // Ensure 'e' is the name of the field
            }));
        }
    };
    
    
    const handleSelectChange = (name, newValue) => {
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };
    

    const getModuleCapacityOptions = () => {
        if (formData.module_type === "P Type") return ["555", "550"];
        if (formData.module_type === "N Type") return ["580", "585"];
        return [];
    };

    useEffect(() => {
        const updatedDcCapacity = calculateDcCapacity(formData.ac_capacity, formData.dc_overloading);
        setFormData(prev => ({ ...prev, dc_capacity: updatedDcCapacity }));
      }, [formData.ac_capacity, formData.dc_overloading]);
      


    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 3, borderRadius: "md", boxShadow: "lg", bgcolor: "background.paper" }}>
            <Typography level="h3" mb={2} sx={{ textAlign: "center", fontWeight: "bold", color: "primary.main" }}>Commercial Offer Form</Typography>
            <Grid container spacing={2}>
               

                {/* Client Name */}
                <Grid xs={12} sm={12}>
                    <FormControl>
                        <FormLabel>Client Name</FormLabel>
                        <Input type="text" name="client_name" value={formData.client_name} onChange={handleChange} placeholder="Enter Client Name" />
                    </FormControl>
                </Grid>

                {/* Location Section */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Village Name</FormLabel>
                        <Input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Enter Village Name" />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>District Name</FormLabel>
                        <Input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="Enter District Name" />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Select a State</FormLabel>
                        <Select 
  name="state"
  value={formData.state}
  onChange={(e, newValue) => handleSelectChange("state", newValue)}
  placeholder="Select State"
>
                            <Option value="Andhra Pradesh">Andhra Pradesh</Option>
                            <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
                            <Option value="Assam">Assam</Option>
                            <Option value="Bihar">Bihar</Option>
                            <Option value="Chhattisgarh">Chhattisgarh</Option>
                            <Option value="Goa">Goa</Option>
                            <Option value="Gujarat">Gujarat</Option>
                            <Option value="Haryana">Haryana</Option>
                            <Option value="Himachal Pradesh">Himachal Pradesh</Option>
                            <Option value="Jharkhand">Jharkhand</Option>
                            <Option value="Karnataka">Karnataka</Option>
                            <Option value="Kerala">Kerala</Option>
                            <Option value="Madhya Pradesh">Madhya Pradesh</Option>
                            <Option value="Maharashtra">Maharashtra</Option>
                            <Option value="Manipur">Manipur</Option>
                            <Option value="Meghalaya">Meghalaya</Option>
                            <Option value="Mizoram">Mizoram</Option>
                            <Option value="Nagaland">Nagaland</Option>
                            <Option value="Odisha">Odisha</Option>
                            <Option value="Punjab">Punjab</Option>
                            <Option value="Rajasthan">Rajasthan</Option>
                            <Option value="Sikkim">Sikkim</Option>
                            <Option value="Tamil Nadu">Tamil Nadu</Option>
                            <Option value="Telangana">Telangana</Option>
                            <Option value="Tripura">Tripura</Option>
                            <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                            <Option value="Uttarakhand">Uttarakhand</Option>
                            <Option value="West Bengal">West Bengal</Option>
                            <Option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</Option>
                            <Option value="Chandigarh">Chandigarh</Option>
                            <Option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</Option>
                            <Option value="Lakshadweep">Lakshadweep</Option>
                            <Option value="Delhi">Delhi</Option>
                            <Option value="Puducherry">Puducherry</Option>
                            <Option value="Ladakh">Ladakh</Option>
                            <Option value="Jammu and Kashmir">Jammu and Kashmir</Option>
                            <Option value="Nagaland">Nagaland</Option>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Pin Code */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Pin Code</FormLabel>
                        <Input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter Pin Code" />
                    </FormControl>
                </Grid>

                    {/* Scheme */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Scheme</FormLabel>
                        <Input type="text" name="scheme" value={formData.scheme} onChange={handleChange} placeholder="Scheme" />
                    </FormControl>
                </Grid>

                {/* Component */}
<Grid item xs={12} sm={6}>
  <FormControl>
    <FormLabel>Component</FormLabel>
    <Select
      name="component"
      value={formData.component}
      onChange={(e, newValue) => handleSelectChange("component", newValue)}
      placeholder="Component"
    >
      <Option value="A">A</Option>
      <Option value="B">B</Option>
    </Select>
  </FormControl>
</Grid>


                {/* Rate */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Rate</FormLabel>
                        <Input type="number" name="rate" value={formData.rate} onChange={handleChange} placeholder="Rate" />
                    </FormControl>
                </Grid>

                 {/* Timeline */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Timeline</FormLabel>
                        <Input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline" />
                    </FormControl>
                </Grid>

                <Grid xs={12}><hr /></Grid>
                
                {/* Plant AC Capacity */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Plant AC Capacity (MW)</FormLabel>
                        <Input type="number" name="ac_capacity" value={formData.ac_capacity} onChange={handleChange} placeholder="Enter Plant AC Capacity" />
                    </FormControl>
                </Grid>

                {/* DC Overloading */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>DC Overloading (%)</FormLabel>
                        <Input type="number" name="dc_overloading" value={formData.dc_overloading} onChange={handleChange} placeholder="Enter DC Overloading (%)" />
                    </FormControl>
                </Grid>

               {/* Plant DC Capacity */}
<Grid item xs={12} sm={6}>
  <FormControl>
    <FormLabel>Plant DC Capacity (MWp)</FormLabel>
    <Input
      type="text"
      name="dc_capacity"
      value={formData.dc_capacity}
      readOnly
      placeholder="Calculated Automatically"
    />
  </FormControl>
</Grid>


                {/* Transmission Line Length */}
                {[{ label: "Transmission Line Length (km)", name: "transmission_length" }].map((field, index) => (
  <Grid item xs={12} sm={6} key={index}>
    <FormControl>
      <FormLabel>{field.label}</FormLabel>
      <Input
        type="number"
        name={field.name}
        placeholder={`Enter ${field.label}`}
        value={formData.transmission_length|| ""}  // Corrected value binding
        onChange={handleChange}            // Corrected change handler
      />
    </FormControl>
  </Grid>
))}


                {/* Dropdown fields */}
                {[
  { label: "Module Orientation", name: "module_orientation", options: ["Landscape", "Portrait", "Agrivoltaic Dropdown"] },
  { label: "Evacuation Voltage Level (kV)", name: "evacuation_voltage", options: [11, 33] },
  { label: "Inverter Capacity (kVA)", name: "inverter_capacity", options: [275, 295, 302] },
  { label: "Transformer", name: "transformer", options: ["OCTC", "OLTC"] }
].map((field, index) => (
  <Grid xs={12} sm={6} key={index}>
    <FormControl>
      <FormLabel>{field.label}</FormLabel>
      <Select
        name={field.name}
        value={formData[field.name] || ""}   // Corrected value binding
        onChange={(e, newValue) => handleSelectChange(field.name, newValue)} // Corrected change handler
        placeholder={`Select ${field.label}`}
      >
        {field.options.map((option, i) => (
          <Option key={i} value={option}>{option}</Option>
        ))}
      </Select>
    </FormControl>
  </Grid>
))}

<Grid xs={12} sm={6}><FormControl><FormLabel>Module Type</FormLabel><Select name="module_type" value={formData.module_type} onChange={(e, newValue) => handleChange("module_type", newValue)} placeholder="Select Module Type"><Option value="P Type">P Type</Option><Option value="N Type">N Type</Option></Select></FormControl></Grid>
<Grid xs={12} sm={6}>
  <FormControl>
    <FormLabel>Module Capacity</FormLabel>
    <Select
      name="module_capacity"
      value={formData.module_capacity || ""}  // Corrected value binding
      onChange={(e, newValue) => handleSelectChange("module_capacity", newValue)} 
      placeholder="Select Module Capacity"
      disabled={!formData.module_type}  // Ensures it's enabled only when module_type is selected
    >
      {getModuleCapacityOptions().map((cap, idx) => (
        <Option key={idx} value={cap}>{cap}</Option>
      ))}
    </Select>
  </FormControl>
</Grid>
                  {/* Prepared By */}
                  <Grid xs={12} sm={12}>
                    <FormControl>
                        <FormLabel>Prepared By</FormLabel>
                        <Input type="text" name="prepared_by" value={formData.prepared_by} onChange={handleChange} placeholder="Prepared By" />
                    </FormControl>
                </Grid>

            </Grid>
       
        </Box>
    );
};

export default CommercialForm;
