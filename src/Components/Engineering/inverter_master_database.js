import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Input, Select, Option, Button, Sheet, Typography, Grid, Box } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Img1 from "../../Assets/Add New Module.png"; 

const AddNewInverterForm = () => {
    const [formData, setFormData] = useState({
        inveter_model: "",
        inveter_size: "",
        inveter_type: "",
        inveter_make: "",
        max_pv_input_voltage: "",
        mpp_voltage_range: "",
        mppt: "",
        pre_mppt_input: "",
        total_input: "",
        max_pv_input_current_per_mppt: "",
        max_dc_short_circuit_current_per_mppt: "",
        ac_output_power: "",
        max_ac_output_current: "",
        nominal_ac_voltage: "",
        status: "",
        submitted_by: "",
    });

    const [expanded, setExpanded] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post("https://api.slnkoprotrac.com/v1/add-inveter-master", formData);
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 850,
                margin: "auto",
                padding: 4,
                borderRadius: "md",
                boxShadow: "lg",
                backgroundColor: "#F8F5F5",
                mt: 6,
                mb: 6
            }}
        >
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <img src={Img1} alt="Module Icon" style={{ width: 65, height: 65 }} />
                <Typography level="h3" textAlign="center" gutterBottom sx={{ mt: 2 }}>
                Add New Inverter
                </Typography>
            </Box>

            {[{
                title: "Inverter Details",
                fields: [
                    { name: "inveter_model", label: "Model No.", gap: true },
                    { name: "inveter_size", label: "Size", gap: true },
                    { name: "inveter_type", label: "Type" },
                    { name: "inveter_make", label: "Make" },
                ],
            },
            {
                title: "Input Side (DC)",
                fields: [
                    { name: "max_pv_input_voltage", label: "MAX. PV INPUT VOLTAGE  (V)", gap: true },
                    { name: "mpp_voltage_range", label: "MPP VOLTAGE RANGE", gap: true },
                    { name: "mppt", label: "MPPT" },
                    { name: "pre_mppt_input", label: "PER MPPT INPUT" },
                    { name: "total_input", label: "TOTAL INPUT" },
                    { name: "max_pv_input_current_per_mppt", label: "MAX. PV INPUT CURRENT PER MPPT (A)" },
                    { name: "max_dc_short_circuit_current_per_mppt", label: "MAX. DC SHORT-CIRCUIT CURRENT PER MPPT (A)" },
                    
                ],
            },
            {
                title: "Output Side (DC)",
                fields: [
                    { name: "ac_output_power", label: "AC OUTPUT POWER", gap: true },
                    { name: "nominal_ac_voltage", label: "NOMINAL AC VOLTAGE", gap: true },
                    { name: "max_ac_output_current", label: "MAX. AC OUTPUT CURRENT  (A)" },
                ],
            },
            ].map((section, index) => (
                <Accordion key={section.title} expanded={expanded === index} onChange={handleAccordionChange(index)} sx={{ mb: 2.5}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#e0e0e0", padding: 2 }}>
                        <Typography level="h5" sx={{ fontWeight: "bold" }}>
                            {section.title}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ mt: 2 }}>
                        <Grid container spacing={4} sx={{ mx: 1 }}>
                            {section.fields.map((field) => (
                                <Grid item xs={12} sm={6} key={field.name} sx={{ mt: field.gap ? 1.5 : 0, mb: 3 }}>
                                    <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                                        {field.label}
                                    </Typography>
                                    <Input fullWidth variant="outlined" placeholder={field.label} name={field.name} value={formData[field.name]} onChange={handleChange} />
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Accordion expanded={expanded === "status"} onChange={handleAccordionChange("status")} sx={{ mb: 2.5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: "#e0e0e0", padding: 2 }}>
                    <Typography level="h5" sx={{ fontWeight: "bold" }}>
                        Status
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mt: 2,  mx: 2 }}>
                    <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                        Status
                    </Typography>
                    <Select fullWidth name="status" value={formData.status} onChange={(e, value) => setFormData({ ...formData, status: value })} placeholder="Select Status">
                        <Option value="Available">Available</Option>
                        <Option value="Not Available">Not Available</Option>
                    </Select>
                </AccordionDetails>
            </Accordion>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
                <Button variant="solid" size="lg" sx={{ px: 4, borderRadius: "md", backgroundColor: "#757575" }}>
                    Back
                </Button>
                <Button onClick={handleSubmit} variant="solid" size="lg" sx={{ px: 4, borderRadius: "md", backgroundColor: "#1565C0" }}>
                    Submit
                </Button>
            </Box>
        </Sheet>
    );
};
export default AddNewInverterForm;
