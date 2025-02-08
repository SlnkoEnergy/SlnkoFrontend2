import { Box, Grid, Sheet, Table, Typography } from "@mui/joy";
import React, { useState,useEffect  } from "react";
import axios from 'axios';
import logo from "../../Assets/slnko_blue_logo.png";
import "../../CSS/file.css";

const Reference = () => {

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


   // Function to determine the specification based on rating
   const getSpecification = (module_capacity) => {
    // Use the module_capacity value directly for specification logic
    if (module_capacity === 580 || module_capacity === 550) {
      return "Highly efficient Mono PERC M10 cells P-Type, PID Free & UV Resistant, With Inbuilt Bypass Diode, Frame is made of Aluminium Anodized With Power Tolerance + 5Wp, With RFID Tag inside module, Product Warranty up to 12 Years and Performance Warranty Up to 27/30 Years.";
    } else if (module_capacity === 585 || module_capacity === 555) {
      return "Highly efficient TOPCon Bifacial N-Type, PID Free & UV Resistant, With Inbuilt Bypass Diode, Frame is made of Aluminium Anodized With Power Tolerance + 5Wp, With RFID Tag inside module, Product Warranty up to 12 Years and Performance Warranty Up to 27/30 Years.";
    } else {
      return "Specification not available.";
    }
  };

  const mountingStructure =(module_orientation) => {
    if(module_orientation === "Portrait" ){
      return "2PX12";
    }
    else{
      return "4LX6";
    }
  };

  // ***for 1st row***
  const internalQuantity1 = offerData.module_capacity
  ? Math.round((offerData.dc_capacity * 1000 * 1000) / offerData.module_capacity)
  : 0;

  const PrintQuantity1 = Math.round(internalQuantity1 / 24) * 24;

  // ***for 2nd row***
  const internalQuantity2 = offerData.ac_capacity
  ? Math.round((offerData.ac_capacity * 1000) / offerData.inverter_capacity)
  : 0;

  // ***for 3rd row***
  const InternalQuantity3 = (offerData.module_orientation === "Portrait" ? 23 : 29) * 1000 * offerData.dc_capacity;

   // ***for 5th row***
   const InternalQuantity5 = offerData.dc_capacity*7000;

   // ***for 6th row***
   const InternalQuantity6 = internalQuantity2*97.5;

   // ***for 6th row***
   const InternalQuantity7 = internalQuantity2*20;

   //***Total Value 1***/
   const TotalVal1 = scmData.spv_modules*PrintQuantity1*offerData.module_capacity;

    //***Total Value 2***/
    const TotalVal2 = scmData.solar_inverter*internalQuantity2;

    //***Total Value 3***/
    const TotalVal3 = scmData.module_mounting_structure*InternalQuantity3;

    //***Total Value 4***/
    const TotalVal4 = Math.round(scmData.mounting_hardware*offerData.dc_capacity*1000*1000);

     //***Total Value 5***/
     const TotalVal5 = scmData.dc_cable*InternalQuantity5;

      //***Total Value 6***/
      const TotalVal6 = Math.round(scmData.ac_cable_inverter_accb*InternalQuantity6);

      //***Total Value 7***/
      const TotalVal7 = scmData.ac_cable_accb_transformer*InternalQuantity7;




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
                    {/* First row (SPV Modules) - Dynamic */}
                    <tr>
                    <td>1.</td>
                    <td>SPV Modules</td>
                    <td>{offerData.module_capacity} Wp</td>
                    <td>{getSpecification(offerData.module_capacity)}</td>

                    <td>Nos.</td>
                    <td>{internalQuantity1}</td>
                    <td>{PrintQuantity1}</td>
                    <td>{scmData.spv_modules}</td>
                    <td>INR/Wp</td>
                    <td>{TotalVal1}</td>
                    <td>12%</td>
                    <td>{TotalVal1*12/100}</td>
                    <td>{TotalVal1*12/100+TotalVal1}</td>
                  </tr>

                  <tr>
                    <td>2.</td>
                    <td>Solar Inverter</td>
                    <td>{offerData.inverter_capacity} Wp</td>
                    <td>
                      Grid-tied String Inverter, Three Phase, 50 Hz Inverter
                      output shall be at 800V, & IGBT/MOSFET Microprocessor,
                      Efficiency-98% or above. 5 years warranty shall be
                      provided by Manufacturer.
                    </td>
                    <td>Nos.</td>
                    <td>{internalQuantity2}</td>
                    <td>{internalQuantity2}</td>
                    <td>{scmData.solar_inverter}</td>
                    <td>INR/Nos.</td>
                    <td>{TotalVal2}</td>
                    <td>12%</td>
                    <td>{TotalVal2*12/100}</td>
                    <td>{TotalVal2*12/100+TotalVal2}</td>
                  </tr>

                  <tr>
                    <td>3.</td>
                    <td>Module Mounting Structure</td>
                    <td>{mountingStructure(offerData.module_orientation)}</td>
                    <td></td>
                    <td>Kg</td>
                    <td>{InternalQuantity3}</td>
                    <td>{InternalQuantity3}</td>
                    <td>{scmData.module_mounting_structure}</td>
                    <td>INR/Kg</td>
                    <td>{TotalVal3}</td>
                    <td>18%</td>
                    <td>{TotalVal3*18/100}</td>
                    <td>{TotalVal3*18/100+TotalVal3}</td>
                  </tr>

                  <tr>
                    <td>4.</td>
                    <td>Module Mounting & MMS Hardware</td>
                    <td>SS304, HDG Grade 8.8</td>
                    <td>
                      SS304 for Module to Purlin Mounting & HDG Grade 8.8 for
                      all other connections
                    </td>
                    <td>Set</td>
                    <td>1</td>
                    <td>1</td>
                    <td>{scmData.mounting_hardware}</td>
                    <td>INR/Wp</td>
                    <td>{TotalVal4}</td>
                    <td>18%</td>
                    <td>{TotalVal4*18/100}</td>
                    <td>{TotalVal4*18/100+TotalVal4}</td>
                  </tr>

                  <tr>
                    <td>5.</td>
                    <td>DC Cable (Solar Module to Inverter)</td>
                    <td>
                      1C x 4 sqmm Cu flexible copper conductor solar DC cable
                      (Red & Black)
                    </td>
                    <td>
                      Flexible copper conductor solar DC cable, Fine wire
                      strands of annealed tinned copper, Rated 1.5 kV DC,
                      Electron Beam Cross Linked Co-polymer(XLPO) Halogen Free
                      Insulation and outer sheath, Black color and Red Colour,
                      DC cables complying to EN50618, TUV 2PFG 1169 for service
                      life expectency of 25 years. Flame retardent, UV resistent
                    </td>
                    <td>m</td>
                    <td>{InternalQuantity5}</td>
                    <td>{InternalQuantity5}</td>
                    <td>{scmData.dc_cable}</td>
                    <td>INR/m</td>
                    <td>{TotalVal5}</td>
                    <td>18%</td>
                    <td>{TotalVal5*18/100}</td>
                    <td>{TotalVal5*18/100+TotalVal5}</td>
                  </tr>

                  <tr>
                    <td>6.</td>
                    <td>AC Cable (Inverter to ACCB) </td>
                    <td>1.9/3.3 kV,3C,300Sqmm Al</td>
                    <td>
                      Aluminium, FRLS with galvanized steel armouring minimum
                      area of coverage 90% , XLPE insulated compliant to IS:
                      7098, with distinct extruded XLPE inner sheath of black
                      color as per IS 5831. If armoured, Galvanized Steel
                      armouring to be used with minumum 90% area of coverage.
                    </td>
                    <td>m</td>
                    <td>{InternalQuantity6}</td>
                    <td>{InternalQuantity6}</td>
                    <td>{scmData.ac_cable_inverter_accb}</td>
                    <td>INR/m</td>
                    <td>{TotalVal6}</td>
                    <td>18%</td>
                    <td>{Math.round(TotalVal6*18/100)}</td>
                    <td>{Math.round(TotalVal6*18/100+TotalVal6)}</td>
                  </tr>

                  <tr>
                    <td>7.</td>
                    <td>AC Cable (ACCB to Transformer)</td>
                    <td>1.9/3.3 kV,3C,300Sqmm Al</td>
                    <td>
                      Aluminium, FRLS with galvanized steel armouring minimum
                      area of coverage 90% , XLPE insulated compliant to IS:
                      7098, with distinct extruded XLPE inner sheath of black
                      color as per IS 5831. If armoured, Galvanized Steel
                      armouring to be used with minumum 90% area of coverage.
                    </td>
                    <td>m</td>
                    <td>{InternalQuantity7}</td>
                    <td>{InternalQuantity7}</td>
                    <td>{scmData.ac_cable_accb_transformer}</td>
                    <td>INR/m</td>
                    <td>{TotalVal7}</td>
                    <td>18%</td>
                    <td>{TotalVal7*18/100}</td>
                    <td>{TotalVal7*18/100+TotalVal7}</td>
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

export default Reference;