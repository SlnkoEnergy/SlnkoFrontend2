import { Box, Grid, Sheet, Table, Typography } from "@mui/joy";
import React, { useState,useEffect  } from "react";
import axios from 'axios';
import logo from "../../Assets/slnko_blue_logo.png";
import "../../CSS/file.css";

const CivilWorks1 = () => {
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

      //***for 25th row ***/
      const internalQuantity25 = Math.round(offerData.dc_capacity*3)+4;

      //***for 31st row ***/
      const internalQuantity31 = offerData.dc_capacity*1000;

       //***for 32nd row ***/
       const internalQuantity32 = offerData.ac_capacity*1000;

         const scmWeekly4 = (ac_capacity)=>{
                   if(ac_capacity<3){
                     return 125000;
                   }
                   else{
                     return 200000;
                   }
                 };

    

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
                  <Box
                    sx={{
                      width: "100%",
                      height: "76vh",
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
                            <td></td>
                            <td></td>
                            <span style={{ fontWeight: "bold" }}>MACHINARY :</span>{" "}
                            Includes Augar, Tractor, JCBs, Hydra, Ajax and other
                            machinaries
                            <td></td>
                            <td>KWp</td>
                            <td>{internalQuantity24}</td>
                            <td>{internalQuantity24}</td>
                            <td>{scmData.installation_commissioing.machinery}</td>
                            <td>INR/Wp</td>
                            <td>226800</td>
                            <td>18%</td>
                            <td>40824</td>
                            <td>267624</td>
                          </tr>
        
                          <tr>
                            <td></td>
                            <td></td>
                            <td>
                              <span style={{ fontWeight: "bold" }}>
                                CIVIL MATERIAL:
                              </span>{" "}
                              Cement, Aggregates, Bricks, Sand & Iron Bars
                            </td>
                            <td></td>
                            <td>KWp</td>
                            <td>{internalQuantity24}</td>
                            <td>{internalQuantity24}</td>
                            <td>{scmData.installation_commissioing.civil_material}</td>
                            <td>INR/Wp</td>
                            <td>907200</td>
                            <td>18%</td>
                            <td>163296</td>
                            <td>1070496</td>
                          </tr>
        
                          <tr>
                            <td>25.</td>
                            <td>Transportaion</td>
                            <td>Transformer, LT/HT, Cables, BOS</td>
                            <td>
                            </td>
                            <td>Vehicles</td>
                            <td>{internalQuantity25}</td>
                            <td>{internalQuantity25}</td>
                            <td>{scmData.transportation}</td>
                            <td>INR/Vehicle</td>
                            <td>840000</td>
                            <td>18%</td>
                            <td>151200</td>
                            <td>991200</td>
                          </tr>
        
                          <tr>
                            <td>26.</td>
                            <td>Transmission Line</td>
                            <td>11 kV Transmission Line with appropriate conductor size and PCC Poles</td>
                            <td>
                            </td>
                            <td>Km</td>
                            <td>0</td>
                            <td>0</td>
                            <td>{scmData.transmission_line}</td>
                            <td>INR/Km</td>
                            <td>0</td>
                            <td>18%</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
        
                          <tr>
                            <td>27.</td>
                            <td>CT PT</td>
                            <td>As per DISCOM requirements</td>
                            <td>
                              
                            </td>
                            <td>Set</td>
                            <td>2</td>
                            <td>2</td>
                            <td>{scmData.ct_pt}</td>
                            <td>INR/Set</td>
                            <td>110000</td>
                            <td>18%</td>
                            <td>19800</td>
                            <td>129800</td>
                          </tr>
        
                          <tr>
                            <td>28.</td>
                            <td>ABT Meter</td>
                            <td>As per DISCOM requirements</td>
                            <td>
                              
                            </td>
                            <td>Set</td>
                            <td>3</td>
                            <td>3</td>
                            <td>{scmData.abt_meter}</td>
                            <td>INR/Set</td>
                            <td>285000</td>
                            <td>18%</td>
                            <td>51300</td>
                            <td>336300</td>
                          </tr>
        
                          <tr>
                            <td>29.</td>
                            <td>VCB Kiosk</td>
                            <td>As per DISCOM requirements</td>
                            <td>
                              
                            </td>
                            <td>Set</td>
                            <td>1</td>
                            <td>1</td>
                            <td>{scmData.vcb_kiosk}</td>
                            <td>INR/Set</td>
                            <td>320000</td>
                            <td>18%</td>
                            <td>57600</td>
                            <td>377600</td>
                          </tr>
        
                          <tr>
                            <td>30.</td>
                            <td>RMS at Substation side</td>
                            <td>As per DISCOM requirements</td>
                            <td>
                              
                            </td>
                            <td>Set</td>
                            <td>1</td>
                            <td>1</td>
                            <td>{scmWeekly4(offerData.ac_capacity)}</td>
                            <td>INR/Set</td>
                            <td>125000</td>
                            <td>18%</td>
                            <td>22500</td>
                            <td>147500</td>
                          </tr>
        
                          <tr>
                            <td>31.</td>
                            <td>Plant Insurance</td>
                            <td>Transit & EAR</td>
                            <td>
                              
                            </td>
                            <td>KWp</td>
                            <td>{internalQuantity31}</td>
                            <td>{internalQuantity31}</td>
                            <td>145340</td>
                            <td>INR</td>
                            <td>75474</td>
                            <td>18%</td>
                            <td>13585</td>
                            <td>89059</td>
                          </tr>

                          <tr>
                            <td>32.</td>
                            <td>SLNKO EPCM Service Charges</td>
                            <td>SLNKO FEE</td>
                            <td>
                              
                            </td>
                            <td>KWp</td>
                            <td>{internalQuantity32}</td>
                            <td>{internalQuantity32}</td>
                            <td>{scmData.slnko_charges}</td>
                            <td>INR</td>
                            <td>75474</td>
                            <td>18%</td>
                            <td>13585</td>
                            <td>89059</td>
                          </tr>

                          
        
                          
                        </tbody>
                      </Table>
                    </Sheet>
                  </Box>
                </Grid>
              </Grid>
            </>
          );
};

export default CivilWorks1;