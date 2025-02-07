import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Typography,
  Grid,
  Sheet,
  FormLabel,
} from "@mui/joy";
import axios from "axios";

const FormComponent = () => {
  const [scmData, setscmData] = useState({
    spv_modules: "",
    solar_inverter: "",
    module_mounting_structure: "",
    mounting_hardware: "",
    dc_cable: "",
    ac_cable_inverter_accb: "",
    ac_cable_accb_transformer: "",
    ac_ht_cable: "",
    earthing_station: "",
    earthing_strips: "",
    earthing_strip: "",
    lightening_arrestor: "",
    datalogger: "",
    auxilary_transformer: "",
    ups_ldb: "",
    balance_of_system: "",
    transportation: "",
    transmission_line: "",
    ct_pt: "",
    abt_meter: "",
    vcb_kiosk: "",
    slnko_charges: "",
    installation_commissioing: {
      labour_works: "",
      machinery: "",
      civil_material: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setscmData((prev) => {
      // Check if the field exists inside installation_commissioing (nested object)
      if (prev.installation_commissioing?.hasOwnProperty(name)) {
        return {
          ...prev,
          installation_commissioing: {
            ...prev.installation_commissioing,
            [name]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };
  

  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(
      "https://api.slnkoprotrac.com/v1/create-scm-rate",
      scmData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Response:", response.data);
    alert("Data submitted successfully!");
    setscmData({
    spv_modules: "",
    solar_inverter: "",
    module_mounting_structure: "",
    mounting_hardware: "",
    dc_cable: "",
    ac_cable_inverter_accb: "",
    ac_cable_accb_transformer: "",
    ac_ht_cable: "",
    earthing_station: "",
    earthing_strips: "",
    earthing_strip: "",
    lightening_arrestor: "",
    datalogger: "",
    auxilary_transformer: "",
    ups_ldb: "",
    balance_of_system: "",
    transportation: "",
    transmission_line: "",
    ct_pt: "",
    abt_meter: "",
    vcb_kiosk: "",
    slnko_charges: "",
    installation_commissioing: {
      labour_works: "",
      machinery: "",
      civil_material: "",
      },
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert("Submission failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <Sheet
      sx={{
        width: "50%",
        margin: "auto",
        padding: 3,
        boxShadow: "lg",
        borderRadius: "md",
      }}
    >
      <Typography level="h2" sx={{ textAlign: "center", mb: 2 }}>
        Solar Equipment Rate Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={4}>
            <FormLabel>SPV Modules (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="spv_modules"
              value={scmData.spv_modules}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Solar Inverter (INR/Nos.)</FormLabel>
            <Input
              type="number"
              name="solar_inverter"
              value={scmData.solar_inverter}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Module Mounting Structure (INR/kg)</FormLabel>
            <Input
              type="number"
              name="module_mounting_structure"
              value={scmData.module_mounting_structure}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Module Mounting & MMS Hardware (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="mounting_hardware"
              value={scmData.mounting_hardware}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>DC Cable (Solar Module to Inverter) (INR/m)</FormLabel>
            <Input
              type="number"
              name="dc_cable"
              value={scmData.dc_cable}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>AC Cable (Inverter to ACCB) (INR/m)</FormLabel>
            <Input
              type="number"
              name="ac_cable_inverter_accb"
              value={scmData.ac_cable_inverter_accb}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>AC Cable (ACCB to Transformer) (INR/m)</FormLabel>
            <Input
              type="number"
              name="ac_cable_accb_transformer"
              value={scmData.ac_cable_accb_transformer}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>AC HT Cable (Transformer to HT Panel) (INR/m)</FormLabel>
            <Input
              type="number"
              name="ac_ht_cable"
              value={scmData.ac_ht_cable}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Earthing Station (INR/Set)</FormLabel>
            <Input
              type="number"
              name="earthing_station"
              value={scmData.earthing_station}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Earthing Strips (25x3 mm GI strip) (INR/m)</FormLabel>
            <Input
              type="number"
              name="earthing_strips"
              value={scmData.earthing_strips}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Earthing Strips (50x6 mm GI strip) (INR/m)</FormLabel>
            <Input
              type="number"
              name="earthing_strip"
              value={scmData.earthing_strip}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Lightening Arrestor (INR/Set)</FormLabel>
            <Input
              type="number"
              name="lightening_arrestor"
              value={scmData.lightening_arrestor}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Datalogger (INR/Set)</FormLabel>
            <Input
              type="number"
              name="datalogger"
              value={scmData.datalogger}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Auxilary transformer (INR/Nos.)</FormLabel>
            <Input
              type="number"
              name="auxilary_transformer"
              value={scmData.auxilary_transformer}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>UPS & LDB (INR/Set)</FormLabel>
            <Input
              type="number"
              name="ups_ldb"
              value={scmData.ups_ldb}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={12}>
            <FormLabel>Balance of system with Wet Module Cleaning System (MCS) & Dry Cleaning semi automatic robot (INR/Set)</FormLabel>
            <Input
              type="number"
              name="balance_of_system"
              value={scmData.balance_of_system}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12}>
  <Typography level="h3" sx={{ mt: 3, textAlign: "center", fontWeight: "bold", color: "#2D3748" }}>
    Civil Works Rate
  </Typography>
</Grid>
          <Grid xs={12}>
            <Typography level="h4" sx={{ mt: 2 }}>
              Installation & Commissioning
            </Typography>
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Labour Works (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="labour_works"
              value={scmData.installation_commissioing.labour_works}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Machinary (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="machinery"
              value={scmData.installation_commissioing.machinery}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Civil Material (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="civil_material"
              value={scmData.installation_commissioing.civil_material}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* Add a margin or divider for separation */}
<Grid xs={12}>
  <Box sx={{ mt: 3, mb: 2, borderBottom: "1px solid #ccc" }} />
</Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Transportaion (INR/Vehicle)</FormLabel>
            <Input
              type="number"
              name="transportation"
              value={scmData.transportation}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>Transmission Line (INR/km)</FormLabel>
            <Input
              type="number"
              name="transmission_line"
              value={scmData.transmission_line}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>CT PT (INR/Set)</FormLabel>
            <Input
              type="number"
              name="ct_pt"
              value={scmData.ct_pt}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>ABT Meter (INR/Set)</FormLabel>
            <Input
              type="number"
              name="abt_meter"
              value={scmData.abt_meter}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>VCB Kiosk (INR/Set)</FormLabel>
            <Input
              type="number"
              name="vcb_kiosk"
              value={scmData.vcb_kiosk}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormLabel>SLNKO EPCM Service Charges (INR/Wp)</FormLabel>
            <Input
              type="number"
              name="slnko_charges"
              value={scmData.slnko_charges}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button type="submit" color="primary" variant="solid">
            Submit
          </Button>
        </Box>
      </form>
    </Sheet>
  );
};

export default FormComponent;
