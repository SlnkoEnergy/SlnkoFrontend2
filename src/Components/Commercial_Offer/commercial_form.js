import React, { useState } from "react";
import { Box, Button, Grid, Input, Select, Option, Typography, FormControl, FormLabel } from "@mui/joy";

const CommercialForm = () => {
    const [offerId, setOfferId] = useState("");
    const [clientName, setClientName] = useState("");
    const [villageName, setVillageName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [state, setState] = useState(""); // For state selection
    const [pinCode, setPinCode] = useState("");
    const [plantAcCapacity, setPlantAcCapacity] = useState("");
    const [dcOverloading, setDcOverloading] = useState("");
    const [plantDcCapacity, setPlantDcCapacity] = useState("");
    const [scheme, setScheme] = useState("");
    const [schemeComponent, setSchemeComponent] = useState("");
    const [rate, setRate] = useState("");
    const [timeline, setTimeline] = useState("");
    const [preparedBy, setPreparedBy] = useState("");
    const [moduleType, setModuleType] = useState("");
    const [moduleCapacity, setModuleCapacity] = useState("");
    

    const calculateDcCapacity = (ac, dc) => {
        const acValue = parseFloat(ac);
        const dcValue = parseFloat(dc) / 100; // Convert percentage to decimal
        if (!isNaN(acValue) && !isNaN(dcValue)) {
            return (acValue * (1 + dcValue)).toFixed(3);
        }
        return "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "plantAcCapacity") setPlantAcCapacity(value);
        if (name === "dcOverloading") setDcOverloading(value);
        setPlantDcCapacity(calculateDcCapacity(name === "plantAcCapacity" ? value : plantAcCapacity, name === "dcOverloading" ? value : dcOverloading));
    };

    // Handle Select component change
    const handleSelectChange = (name, newValue) => {
        if (name === "state") {
            setState(newValue);
        }
        if (name === "schemeComponent") setSchemeComponent(newValue); // Handle Scheme Component
        // Add other select fields handling if needed
        if (name === "moduleType") {
            setModuleType(newValue);
            setModuleCapacity(""); // Reset module capacity when module type changes
        }
    };

    const getModuleCapacityOptions = () => {
        if (moduleType === "P Type") return ["555", "550"];
        if (moduleType === "N Type") return ["580", "585"];
        return [];
    };


    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 3, borderRadius: "md", boxShadow: "lg", bgcolor: "background.paper" }}>
            <Typography level="h3" mb={2} sx={{ textAlign: "center", fontWeight: "bold", color: "primary.main" }}>Commercial Offer Form</Typography>
            <Grid container spacing={2}>
                {/* Offer ID */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Offer ID</FormLabel>
                        <Input type="text" name="offerId" value={offerId} onChange={(e) => setOfferId(e.target.value)} placeholder="Enter Offer ID" />
                    </FormControl>
                </Grid>

                {/* Client Name */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Client Name</FormLabel>
                        <Input type="text" name="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Enter Client Name" />
                    </FormControl>
                </Grid>

                {/* Location Section */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Village Name</FormLabel>
                        <Input type="text" name="villageName" value={villageName} onChange={(e) => setVillageName(e.target.value)} placeholder="Enter Village Name" />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>District Name</FormLabel>
                        <Input type="text" name="districtName" value={districtName} onChange={(e) => setDistrictName(e.target.value)} placeholder="Enter District Name" />
                    </FormControl>
                </Grid>

                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Select a State</FormLabel>
                        <Select
                            name="state"
                            value={state}
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
                        <Input type="text" name="pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="Enter Pin Code" />
                    </FormControl>
                </Grid>

                    {/* Scheme */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Scheme</FormLabel>
                        <Input type="text" name="scheme" value={scheme} onChange={(e) => setScheme(e.target.value)} placeholder="Scheme" />
                    </FormControl>
                </Grid>

                {/* Component */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Component</FormLabel>
                        <Select name="schemeComponent" value={schemeComponent} onChange={(e, newValue) => handleSelectChange("schemeComponent", newValue)} placeholder="Component">
                            <Option value="A">A</Option>
                            <Option value="B">B</Option>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Rate */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Rate</FormLabel>
                        <Input type="number" name="rate" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Rate" />
                    </FormControl>
                </Grid>

                 {/* Timeline */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Timeline</FormLabel>
                        <Input type="text" name="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="Timeline" />
                    </FormControl>
                </Grid>

                <Grid xs={12}><hr /></Grid>
                
                {/* Plant AC Capacity */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Plant AC Capacity (MW)</FormLabel>
                        <Input type="number" name="plantAcCapacity" value={plantAcCapacity} onChange={handleInputChange} placeholder="Enter Plant AC Capacity" />
                    </FormControl>
                </Grid>

                {/* DC Overloading */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>DC Overloading (%)</FormLabel>
                        <Input type="number" name="dcOverloading" value={dcOverloading} onChange={handleInputChange} placeholder="Enter DC Overloading (%)" />
                    </FormControl>
                </Grid>

                {/* Plant DC Capacity */}
                <Grid xs={12} sm={6}>
                    <FormControl>
                        <FormLabel>Plant DC Capacity (MWp)</FormLabel>
                        <Input type="text" name="plantDcCapacity" value={plantDcCapacity} readOnly placeholder="Calculated Automatically" />
                    </FormControl>
                </Grid>

                {/* Transmission Line Length */}
                {[{ label: "Transmission Line Length (km)", name: "transmissionLength" }].map((field, index) => (
                    <Grid xs={12} sm={6} key={index}>
                        <FormControl>
                            <FormLabel>{field.label}</FormLabel>
                            <Input type="number" name={field.name} placeholder={`Enter ${field.label}`} />
                        </FormControl>
                    </Grid>
                ))}

                {/* Dropdown fields */}
                {[{
                    label: "Module Orientation",
                    name: "moduleOrientation",
                    options: ["Landscape", "Portrait", "Agrivoltaic Dropdown"]
                }    
                ,{
                    label: "Evacuation Voltage Level (kV)",
                    name: "evacuationVoltage",
                    options: [11, 33]
                }, {
                    label: "Inverter Capacity (kVA)",
                    name: "inverterCapacity",
                    options: [275, 295, 302]
                }, {
                    label: "Transformer",
                    name: "transformer",
                    options: ["OCTC", "OLTC"]
                }].map((field, index) => (
                    <Grid xs={12} sm={6} key={index}>
                        <FormControl>
                            <FormLabel>{field.label}</FormLabel>
                            <Select
                                name={field.name}
                                value={field.value}
                                onChange={(e, newValue) => handleSelectChange(field.name, newValue)}
                                placeholder={`Select ${field.label}`}
                            >
                                {field.options.map((option, i) => (
                                    <Option key={i} value={option}>{option}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
                ))}

<Grid xs={12} sm={6}><FormControl><FormLabel>Module Type</FormLabel><Select name="moduleType" value={moduleType} onChange={(e, newValue) => handleSelectChange("moduleType", newValue)} placeholder="Select Module Type"><Option value="P Type">P Type</Option><Option value="N Type">N Type</Option></Select></FormControl></Grid>
<Grid xs={12} sm={6}><FormControl><FormLabel>Module Capacity</FormLabel><Select name="moduleCapacity" value={moduleCapacity} onChange={(e, newValue) => setModuleCapacity(newValue)} placeholder="Select Module Capacity" disabled={!moduleType}>{getModuleCapacityOptions().map(cap => <Option key={cap} value={cap}>{cap}</Option>)}</Select></FormControl></Grid>
                  {/* Prepared By */}
                  <Grid xs={12} sm={12}>
                    <FormControl>
                        <FormLabel>Prepared By</FormLabel>
                        <Input type="text" name="preparedBy" value={preparedBy} onChange={(e) => setPreparedBy(e.target.value)} placeholder="Prepared By" />
                    </FormControl>
                </Grid>

            </Grid>
            <Button sx={{ mt: 2, width: "100%" }} variant="solid">Submit</Button>
        </Box>
    );
};

export default CommercialForm;
