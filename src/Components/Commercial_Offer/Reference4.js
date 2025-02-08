import { Box, Grid, Sheet, Table, Typography } from "@mui/joy";
import React, { useState,useEffect  } from "react";
import axios from 'axios';
import logo from "../../Assets/slnko_blue_logo.png";
import "../../CSS/file.css";

const Reference4 = () => {
    const [offerData, setOfferData] = useState({
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
        column_type: ""
      });


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
              
              
                 useEffect(() => {
                  const fetchData = async () => {
                    try {
                      const response = await axios.get("https://api.slnkoprotrac.com/v1/get-comm-offer");
                      const result = await axios.get("https://api.slnkoprotrac.com/v1/get-comm-scm-rate");
                      console.log("API Response:", response.data);
                      console.log("API Response:", result.data);
              
                      // Assuming the data returned matches the structure you want
                      const fetchedData = response.data[0]; // Adjust based on the structure of API response
                      const fetchedScmData = result.data[0];
                      // Map API response to the state keys (for simplicity)
                      setOfferData({
                        offer_id: fetchedData.offer_id || "",
                        client_name: fetchedData.client_name || "",
                        village: fetchedData.village || "",
                        district: fetchedData.district || "",
                        state: fetchedData.state || "",
                        pincode: fetchedData.pincode || "",
                        ac_capacity: fetchedData.ac_capacity || "",
                        dc_overloading: fetchedData.dc_overloading || "",
                        dc_capacity: fetchedData.dc_capacity || "",
                        scheme: fetchedData.scheme || "",
                        component: fetchedData.component || "",
                        rate: fetchedData.rate || "",
                        timeline: fetchedData.timeline || "",
                        prepared_by: fetchedData.prepared_by || "",
                        module_type: fetchedData.module_type || "",
                        module_capacity: fetchedData.module_capacity || "",
                        inverter_capacity: fetchedData.inverter_capacity || "",
                        evacuation_voltage: fetchedData.evacuation_voltage || "",
                        module_orientation: fetchedData.module_orientation || "",
                        transmission_length: fetchedData.transmission_length || "",
                        transformer: fetchedData.transformer || "",
                        column_type: fetchedData.column_type || ""
                      });
              
                      setscmData({
                        spv_modules: fetchedScmData.spv_modules || "",
                        solar_inverter:  fetchedScmData.solar_inverter || "",
                        module_mounting_structure:  fetchedScmData.module_mounting_structure || "",
                        mounting_hardware:  fetchedScmData.mounting_hardware || "",
                        dc_cable:  fetchedScmData.dc_cable || "",
                        ac_cable_inverter_accb:  fetchedScmData.ac_cable_inverter_accb || "",
                        ac_cable_accb_transformer:  fetchedScmData.ac_cable_accb_transformer || "",
                        ac_ht_cable:  fetchedScmData.ac_ht_cable || "",
                        earthing_station:  fetchedScmData.earthing_station || "",
                        earthing_strips:  fetchedScmData.earthing_strips || "",
                        earthing_strip:  fetchedScmData.earthing_strip || "",
                        lightening_arrestor:  fetchedScmData.lightening_arrestor || "",
                        datalogger:  fetchedScmData.datalogger || "",
                        auxilary_transformer:  fetchedScmData.auxilary_transformer || "",
                        ups_ldb:  fetchedScmData.ups_ldb || "",
                        balance_of_system:  fetchedScmData.balance_of_system || "",
                        transportation:  fetchedScmData.transportation || "",
                        transmission_line:  fetchedScmData.transmission_line || "",
                        ct_pt:  fetchedScmData.ct_pt || "",
                        abt_meter:  fetchedScmData.abt_meter || "",
                        vcb_kiosk:  fetchedScmData.vcb_kiosk || "",
                        slnko_charges:  fetchedScmData.slnko_charges || "",
                        installation_commissioing: {
                            labour_works: fetchedScmData.installation_commissioing?.labour_works || "",
                            machinery: fetchedScmData.installation_commissioing?.machinery || "",
                            civil_material: fetchedScmData.installation_commissioing?.civil_material || "",
                          },
                      });
              
                    } catch (error) {
                      console.error("Error fetching commercial offer data:", error);
                    }
                  };
              
                  fetchData();
                }, []); // Run only once on component mount


      //***for 24th row ***/
      const internalQuantity24 = offerData.dc_capacity*1000;


      //***Total Value 23***/
      const TotalVal23 = scmData.balance_of_system*internalQuantity24;

      //***Total Value 24***/
      const TotalVal24 = scmData.installation_commissioing.labour_works*internalQuantity24*1000;


    
        return (
            <>
              <Grid
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: "2px solid blue",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "flex-end",
                      gap: 2,
                    }}
                  >
                    <img width={"220px"} height={"110px"} alt="logo" src={logo} />
        
                    <hr
                      style={{
                        width: "60%",
                        color: "blue",
                        borderTop: "3px solid #0f4C7f",
                        margin: "19px 0",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#56A4DA",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        textDecoration: "underline rgb(243, 182, 39)",
                        textDecorationThickness: "3px",
                        textUnderlineOffset: "6px",
                      }}
                    >
                      Reference&nbsp;{" "}
                    </Typography>
        
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        textDecoration: "underline rgb(243, 182, 39)",
                        textDecorationThickness: "3px",
                        textUnderlineOffset: "6px",
                      }}
                    >
                      Material List
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                    }}
                  >
                    <Sheet
                      sx={{
                        width: "99.5%",
                        height: "100%",
                        backgroundColor: "white",
                      }}
                    >
                      <Table className="table-header">
                        <thead>
                          <tr>
                            <th style={{ width: "2.5%" }}>S.NO.</th>
                            <th style={{ width: "5.5%" }}>ITEM NAME</th>
                            <th style={{ width: "6%" }}>RATING</th>
                            <th style={{ width: "20%" }}>SPECIFICATION</th>
                            <th>UoM</th>
                            <th>Qty (Int.)</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Rate UoM</th>
                            <th>Total Value</th>
                            <th>GST</th>
                            <th>GST Value</th>
                            <th>Total with GST</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>23.</td>
                            <td>
                              Balance of system with Wet Module Cleaning System (MCS) &
                              Dry Cleaning semi automatic robot
                            </td>
                            <td>
                              Class C Items including Connectors, Lungs, Glands,
                              Termination Kits, Conduits, Cable Tie, Ferruls, Sleeves,
                              PU Foam, Route Marker, Danger boards and signages, Double
                              Warning Tape, & Fire Fighting System
                            </td>
                            <td></td>
                            <td>KWp</td>
                            <td>{internalQuantity24}</td>
                            <td>{internalQuantity24}</td>
                            <td>{scmData.balance_of_system}</td>
                            <td>INR/Set</td>
                            <td>{TotalVal23}</td>
                            <td>18%</td>
                            <td>108864</td>
                            <td>713664</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Sheet>
        
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      marginTop:'20px',
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#56A4DA",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        textDecoration: "underline rgb(243, 182, 39)",
                        textDecorationThickness: "3px",
                        textUnderlineOffset: "6px",
                      }}
                    >
                      Civil&nbsp;{" "}
                    </Typography>
        
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                        textDecoration: "underline rgb(243, 182, 39)",
                        textDecorationThickness: "3px",
                        textUnderlineOffset: "6px",
                      }}
                    >
                      Works
                    </Typography>
        
        
                    
                  </Box>
                  <Sheet
                      sx={{
                        width: "99.5%",
                        height: "100%",
                        backgroundColor: "white",
                        marginBottom:'10px'
                      }}
                    >
                      <Table className="table-header">
                        <thead>
                          <tr>
                            <th style={{ width: "2.5%" }}>S.NO.</th>
                            <th style={{ width: "5.5%" }}>ITEM NAME</th>
                            <th style={{ width: "6%" }}>RATING</th>
                            <th style={{ width: "20%" }}>SPECIFICATION</th>
                            <th>UoM</th>
                            <th>Qty (Int.)</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Rate UoM</th>
                            <th>Total Value</th>
                            <th>GST</th>
                            <th>GST Value</th>
                            <th>Total with GST</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>24.</td>
                            <td>
                            Installation and commissioing
                            </td>
                            <td>
                            <span style={{fontWeight:'bold'}}>LABOUR WORKS:</span> Includes Pile casting, Module Mounting & Alignment, and complete AC-DC work till commissioning inside plant boundary
                            </td>
                            <td></td>
                            <td>KWp</td>
                            <td>{internalQuantity24}</td>
                            <td>{internalQuantity24}</td>
                            <td>{scmData.installation_commissioing.labour_works}</td>
                            <td>INR/Wp</td>
                            <td>{TotalVal24}</td>
                            <td>18%</td>
                            <td>217728</td>
                            <td>1427328</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Sheet>
                </Grid>
              </Grid>
            </>
          );
};

export default Reference4;