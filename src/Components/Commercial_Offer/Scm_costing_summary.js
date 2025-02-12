import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Typography,
  Grid,
  Button,
  Sheet,
  FormLabel,
} from "@mui/joy";
import axios from "axios";

const ScmCostingSummary = () => {
  const [scmData, setscmData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-comm-scm-rate");
        setscmData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    console.log("Back button clicked.");
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
        Solar Equipment Rate Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={4}>
          <FormLabel>SPV Modules (INR/Wp)</FormLabel>
          <Input type="number" name="spv_modules" value={scmData.spv_modules || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Solar Inverter (INR/Nos.)</FormLabel>
          <Input type="number" name="solar_inverter" value={scmData.solar_inverter || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Module Mounting Structure (INR/kg)</FormLabel>
          <Input type="number" name="module_mounting_structure" value={scmData.module_mounting_structure || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Module Mounting & MMS Hardware (INR/Wp)</FormLabel>
          <Input type="number" name="mounting_hardware" value={scmData.mounting_hardware || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>DC Cable (Solar Module to Inverter) (INR/m)</FormLabel>
          <Input type="number" name="dc_cable" value={scmData.dc_cable || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>AC Cable (Inverter to ACCB) (INR/m)</FormLabel>
          <Input type="number" name="ac_cable_inverter_accb" value={scmData.ac_cable_inverter_accb || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>AC Cable (ACCB to Transformer) (INR/m)</FormLabel>
          <Input type="number" name="ac_cable_accb_transformer" value={scmData.ac_cable_accb_transformer || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>AC HT Cable (Transformer to HT Panel) (INR/m)</FormLabel>
          <Input type="number" name="ac_ht_cable" value={scmData.ac_ht_cable || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Earthing Station (INR/Set)</FormLabel>
          <Input type="number" name="earthing_station" value={scmData.earthing_station || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Earthing Strips (25x3 mm GI strip) (INR/m)</FormLabel>
          <Input type="number" name="earthing_strips" value={scmData.earthing_strips || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Earthing Strips (50x6 mm GI strip) (INR/m)</FormLabel>
          <Input type="number" name="earthing_strip" value={scmData.earthing_strip || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Lightening Arrestor (INR/Set)</FormLabel>
          <Input type="number" name="lightening_arrestor" value={scmData.lightening_arrestor || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Datalogger (INR/Set)</FormLabel>
          <Input type="number" name="datalogger" value={scmData.datalogger || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Auxiliary Transformer (INR/Nos.)</FormLabel>
          <Input type="number" name="auxilary_transformer" value={scmData.auxilary_transformer || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>UPS & LDB (INR/Set)</FormLabel>
          <Input type="number" name="ups_ldb" value={scmData.ups_ldb || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={12}>
          <FormLabel>Balance of System with Wet Module Cleaning System (MCS) & Dry Cleaning Semi-Automatic Robot (INR/Set)</FormLabel>
          <Input type="number" name="balance_of_system" value={scmData.balance_of_system || ""} readOnly fullWidth />
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
          <Input type="number" name="labour_works" value={scmData.installation_commissioing?.labour_works || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Machinery (INR/Wp)</FormLabel>
          <Input type="number" name="machinery" value={scmData.installation_commissioing?.machinery || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Civil Material (INR/Wp)</FormLabel>
          <Input type="number" name="civil_material" value={scmData.installation_commissioing?.civil_material || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12}>
          <Box sx={{ mt: 3, mb: 2, borderBottom: "1px solid #ccc" }} />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Transportation (INR/Vehicle)</FormLabel>
          <Input type="number" name="transportation" value={scmData.transportation || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Transmission Line Internal (INR/km)</FormLabel>
          <Input type="number" name="transmission_line_internal" value={scmData.transmission_line_internal || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Transmission Line Print (INR/km)</FormLabel>
          <Input type="number" name="transmission_line_print" value={scmData.transmission_line_print || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>Transmission Line (INR/km)</FormLabel>
          <Input type="number" name="transmission_line" value={scmData.transmission_line || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>CT PT (INR/Set)</FormLabel>
          <Input type="number" name="ct_pt" value={scmData.ct_pt || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>ABT Meter (INR/Set)</FormLabel>
          <Input type="number" name="abt_meter" value={scmData.abt_meter || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>VCB Kiosk (INR/Set)</FormLabel>
          <Input type="number" name="vcb_kiosk" value={scmData.vcb_kiosk || ""} readOnly fullWidth />
        </Grid>
        <Grid xs={12} sm={4}>
          <FormLabel>SLNKO EPCM Service Charges (INR/Wp)</FormLabel>
          <Input type="number" name="slnko_charges" value={scmData.slnko_charges || ""} readOnly fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button color="primary" variant="solid">Back</Button>
      </Box>
      
    </Sheet>
  );
};

export default ScmCostingSummary;
