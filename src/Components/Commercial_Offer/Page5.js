
import { Box, Grid, Typography } from "@mui/joy";
import logo from "../../Assets/slnko.png";
import React, { useState,useEffect  } from "react";
import axios from 'axios';
import "../../CSS/file.css";

const Page5 = () => {
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


      useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get("https://api.slnkoprotrac.com/v1/get-comm-offer");
              console.log("API Response:", response.data);
             
              // Assuming the data returned matches the structure you want
              const fetchedData = response.data[0]; // Adjust based on the structure of API response
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
      
             
            } catch (error) {
              console.error("Error fetching commercial offer data:", error);
            }
          };
      
          fetchData();
        }, []);
  return (
    <>
      <Grid
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media print": {
            width: "210mm",
            height: "297mm",
            overflow: "hidden",
            margin: "0",
            padding: "0",
            pageBreakInside: "avoid",
          },
        }}
      >
        <Box
          sx={{
            position:'absolute',
            left:'59.59%',
            backgroundColor:'#F2F4F5',
            height:'137%',
            width:'20%',
            zIndex:-1,
            '@media print':{
              height:'297mm !important',
              left:'67.59%',
              width:'40%',
            }
          }}
          ></Box>
        <Grid
          sx={{
            width: "60%",
            height: "100%",
            border: "2px solid blue",
            "@media print": {
              width: "210mm",
              height: "297mm",
            },
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
            <img width={"300px"} height={"180px"} alt="logo" src={logo} />

            <hr
              style={{
                width: "50%",
                borderTop: "3px solid #0f4C7f", // Keeps the line visible
                margin: "36px 0",
                boxShadow: "none !important", // Force removal of any shadow
                background: "transparent !important", // Ensure no background color
                border: "none !important", // Ensure no border shadow
                // Remove any outline if applied
              }}
              
            />
          </Box>
          <br />
          <br />
          <br />
          <br />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textDecoration: "underline 3px rgb(243, 182, 39)",
                textUnderlineOffset: "8px",
                '@media print':{
                  fontSize:'2rem'
                }
              }}
              textColor={"#56A4DA"}
              fontWeight={"bold"}
              fontSize={"2.5rem"}
              fontFamily={"sans-serif"}
            >
              COMMERCIAL OFFER <span style={{ color: "black" }}>FOR KUSUM</span>{" "}
            </Typography>
          </Box>
          <br />
          <br />
          <br />
          <Box
            sx={{
              width: "90%",
              paddingLeft: "40px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                '@media print':{
                  fontSize:'1.5rem'
                }
              }}
              >
                To
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >
                {offerData.client_name}
              </Typography>
            </Box>
            <Box>
              <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >
                {offerData.village}, {offerData.district}, {offerData.state} - {offerData.pincode}
              </Typography>
            </Box>
            <br />
            <br />
            <Box>
              <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >
                <span style={{ fontWeight: "bold" }}>Subject:</span> EPCM
                Services for {offerData.ac_capacity} MW AC / {offerData.dc_capacity} MW DC Ground Mount {offerData.scheme} Solar Project
                Component {offerData.component}
              </Typography>
            </Box>
            <br />
            <br />
            <Box>
              <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >
                We are pleased to submit our commercial offer for the
                above-mentioned subject. We are submitting our most reasonable
                commercial offer for your consideration based on your
                requirements. We believe our quality-to-price ratio will meet
                your expectations.
              </Typography>
            </Box>
            <br />
            <br />
            <Box>
            <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >
              We are looking forward to having a long and fruitful association with your esteemed organization through this project.

              </Typography>
            </Box>
            <br />
            <br />

            <Box>
            <Typography
                fontSize={"1.8rem"}
                fontFamily={"serif"}
                fontWeight={"400"}
                sx={{
                  '@media print':{
                  fontSize:'1.5rem'
                }
                }}
              >Thanking you! <br /> {offerData.prepared_by}</Typography>
            </Box>

            <Box
            sx={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              position:"relative",
              marginTop:'24%',
              '@media print':{
                marginTop:'18%'
              }
            }}
            >
            <hr
              style={{
                width: "80%",
                color: "blue",
                borderTop: "2px solid goldenrod",
                
              }}
            />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Page5;
