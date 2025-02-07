import { Box, Grid, Sheet, Table, Typography } from "@mui/joy";
import React, { useState,useEffect  } from "react";
import axios from 'axios';
import logo from "../../Assets/slnko_blue_logo.png";
import "../../CSS/file.css";

const Reference2 = () => {

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

  // ***for 2nd row***
  const internalQuantity2 = offerData.ac_capacity
  ? Math.round((offerData.ac_capacity * 1000) / offerData.inverter_capacity)
  : 0;

  // ***for 9th row***
  const internalQuantity9 = internalQuantity2*5;

  // ***for 19th row***/
  const internalQuantity19 = offerData.dc_capacity
  ? Math.round(offerData.dc_capacity)
  : 0;

  //***for 10th row***/
  const internalQuantity10 = internalQuantity19*15;


  //***for 11th row***/
  const internalQuantity11 = offerData.dc_capacity
  ? Math.round(offerData.dc_capacity*0.4 * 1000)
  : 0;

    const evacuationVoltage =(evacuation_voltage) => {
        if(evacuation_voltage === 11 ){
          return "11 kV(E),3C,120Sqmm Al,Ar,HT,XLPE, CABLE";
        }
        else{
          return "33 kV(E),3C,120Sqmm Al,Ar,HT,XLPE, CABLE";
        }
      };

      const setUp = (ac) => {
        const acValue = parseFloat(ac);
        if(!isNaN(acValue)){
            return (acValue*1.1*1000).toFixed(2);
        }
        console.log(setUp);
        return "";

      }

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
                      <tr>
                        <td>8.</td>
                        <td>AC HT Cable (Transformer to HT Panel)</td>
                        <td>{evacuationVoltage(offerData.evacuation_voltage)}</td>
                        <td>
                          Aluminium, FRLS with galvanized steel armouring minimum
                          area of coverage 90% , XLPE insulated compliant to IS:
                          7098, with distinct extruded XLPE inner sheath of black
                          color as per IS 5831. If armoured, Galvanized Steel
                          armouring to be used with minumum 90% area of coverage.
                        </td>
                        <td>m</td>
                        <td>50</td>
                        <td>50</td>
                        <td>{scmData.ac_ht_cable}</td>
                        <td>INR/m</td>
                        <td>55000</td>
                        <td>18%</td>
                        <td>9900</td>
                        <td>64900</td>
                      </tr>
    
                      <tr>
                        <td>9.</td>
                        <td>AC & DC Earthing Cable</td>
                        <td>1C/35 sqmm /Cu / Green Cable/UnAr</td>
                        <td>Cu / Green Cable/UnAr., 450/750V</td>
                        <td>m</td>
                        <td>{internalQuantity9}</td>
                        <td>{internalQuantity9}</td>
                        <td>380</td>
                        <td>INR/m</td>
                        <td>17100</td>
                        <td>18%</td>
                        <td>3078</td>
                        <td>20178</td>
                      </tr>
    
                      <tr>
                        <td>10.</td>
                        <td>LA Earthing Cable</td>
                        <td>1C/70 sqmm /Cu / Green Cable/UnAr</td>
                        <td>
                          PVC Insulated flexible Cu Cable, Cu / Green Cable/UnAr
                        </td>
                        <td>m</td>
                        <td>{internalQuantity10}</td>
                        <td>{internalQuantity10}</td>
                        <td>660</td>
                        <td>INR/m</td>
                        <td>29700</td>
                        <td>18%</td>
                        <td>5346</td>
                        <td>35046</td>
                      </tr>
    
                      <tr>
                        <td>11.</td>
                        <td>Communication Cable</td>
                        <td>RS485 / 2P / 0.5 sqmm / Armoured / Shielded Cable</td>
                        <td>RS485 / 2P / 0.5 sqmm / Armoured / Shielded Cable</td>
                        <td>m</td>
                        <td>{internalQuantity11}</td>
                        <td>{internalQuantity11}</td>
                        <td>130</td>
                        <td>INR/m</td>
                        <td>157300</td>
                        <td>18%</td>
                        <td>28314</td>
                        <td>185614</td>
                      </tr>
    
                      <tr>
                        <td>12.</td>
                        <td>Control Cable (Trafo to HT Panel)</td>
                        <td>14Cx2.5 sqmm Cu XLPE Ar Cable</td>
                        <td>14Cx2.5 sqmm Cu XLPE Ar Cable</td>
                        <td>m</td>
                        <td>20</td>
                        <td>20</td>
                        <td>470</td>
                        <td>INR/m</td>
                        <td>9400</td>
                        <td>18%</td>
                        <td>1692</td>
                        <td>11092</td>
                      </tr>
    
                      <tr>
                        <td>13.</td>
                        <td>AC Combiner (Distribution) Box</td>
                        <td>9IN 2OUT(I/P MCCB & O/P ACB)</td>
                        <td>
                          3 phase, 800 V, 50 Hz ACCB Panel with
                          <br />
                          - Suitable MCCB's at Input
                          <br />
                          - Suitable ACB at Output
                          <br />
                          - Al, 3 phase, 3 W, bus bar
                          <br />
                          - MFM of class 0.5s accuracy
                          <br />- IP 65, floor mounted, air - insulated, cubical
                          type
                        </td>
                        <td>Set</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1292000</td>
                        <td>INR/Set</td>
                        <td>1292000</td>
                        <td>18%</td>
                        <td>232560</td>
                        <td>1524260</td>
                      </tr>
    
                      <tr>
                        <td>14.</td>
                        <td>Step-up Transformer</td>
                        <td>
                          Step up Transformer {setUp(offerData.ac_capacity)} kVA, 0.800/{offerData.evacuation_voltage}kV±10%, 50Hz±5Hz,
                          Ynd11,Z=6.5%,
                          <br/>{offerData.transformer},ONAN
                        </td>
                        <td>
                          Step up inverter duty Transformer, Copper wound, ONAN,
                          natural cooled, outdoor type, oil immersed, Type Test
                          report required.
                        </td>
                        <td>Nos.</td>
                        <td>1</td>
                        <td>1</td>
                        <td>2184000</td>
                        <td>INR/Nos.</td>
                        <td>2184000</td>
                        <td>18%</td>
                        <td>393120</td>
                        <td>2577120</td>
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

export default Reference2;