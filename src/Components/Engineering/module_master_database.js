import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Input, Select, Option, Button, Sheet, Typography, Grid, Box } from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Img1 from "../../Assets/Add New Module.png"; 

const AddNewModuleForm = () => {
    const [formData, setFormData] = useState({
        make: "",
        power: "",
        type: "",
        model: "",
        vmp: "",
        imp: "",
        voc: "",
        isc: "",
        alpha: "",
        beta: "",
        gamma: "",
        l: "",
        w: "",
        t: "",
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
            const response = await axios.post("https://api.slnkoprotrac.com/v1/add-module-master", formData);
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
                    Add New Module
                </Typography>
            </Box>

            {[{
                title: "Module Details",
                fields: [
                    { name: "make", label: "Make", gap: true },
                    { name: "power", label: "Power (Wp)", gap: true },
                    { name: "type", label: "Type" },
                    { name: "model", label: "Model No." },
                ],
            },
            {
                title: "Technical Data",
                fields: [
                    { name: "vmp", label: "Vmp (V)", gap: true },
                    { name: "imp", label: "Imp (I)", gap: true },
                    { name: "voc", label: "Voc (V)" },
                    { name: "isc", label: "Isc (I)" },
                ],
            },
            {
                title: "Temperature Coefficients",
                fields: [
                    { name: "alpha", label: "α (Isc)", gap: true },
                    { name: "beta", label: "β (Voc)", gap: true },
                    { name: "gamma", label: "γ (Pmax)" },
                ],
            },
            {
                title: "Dimensions",
                fields: [
                    { name: "l", label: "L", gap: true },
                    { name: "w", label: "W", gap: true },
                    { name: "t", label: "T" },
                ],
            }].map((section, index) => (
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
export default AddNewModuleForm;
