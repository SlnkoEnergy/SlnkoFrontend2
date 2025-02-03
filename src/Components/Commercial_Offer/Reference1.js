import { Box, Grid, Sheet, Table, Typography } from "@mui/joy";
import React from "react";
import logo from "../../Assets/slnko_blue_logo.png";
import "../../CSS/file.css";

const Reference = () => {
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
                    <td>1.</td>
                    <td>SPV Modules</td>
                    <td>545 Wp</td>
                    <td>
                      Highly efficient Mono PERC M10 cells P-Type, PID Free & UV
                      Resistant, With Inbuilt Bypass Diode, Frame is made of
                      Aluminium Anodized With Power Tolerance + 5Wp, With RFID
                      Tag inside module, Product Warranty up to 12 Years and
                      Performance Warranty Up to 27/30 Years.
                    </td>
                    <td>Nos.</td>
                    <td>5214</td>
                    <td>5208</td>
                    <td>15</td>
                    <td>INR/Wp</td>
                    <td>45309600</td>
                    <td>12%</td>
                    <td>5437152</td>
                    <td>50746752</td>
                  </tr>

                  <tr>
                    <td>2.</td>
                    <td>Solar Inverter</td>
                    <td>295 kVA</td>
                    <td>
                      Grid-tied String Inverter, Three Phase, 50 Hz Inverter
                      output shall be at 800V, & IGBT/MOSFET Microprocessor,
                      Efficiency-98% or above. 5 years warranty shall be
                      provided by Manufacturer.
                    </td>
                    <td>Nos.</td>
                    <td>9</td>
                    <td>9</td>
                    <td>460000</td>
                    <td>INR/Nos.</td>
                    <td>4140000</td>
                    <td>12%</td>
                    <td>496800</td>
                    <td>4636800</td>
                  </tr>

                  <tr>
                    <td>3.</td>
                    <td>Module Mounting Structure</td>
                    <td>2PX12 Table</td>
                    <td></td>
                    <td>Kg</td>
                    <td>69552</td>
                    <td>69552</td>
                    <td>77</td>
                    <td>INR/Kg</td>
                    <td>5355504</td>
                    <td>18%</td>
                    <td>963991</td>
                    <td>6319495</td>
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
                    <td>0.20</td>
                    <td>INR/Wp</td>
                    <td>604800</td>
                    <td>18%</td>
                    <td>108864</td>
                    <td>713664</td>
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
                    <td>21168</td>
                    <td>21168</td>
                    <td>37.5</td>
                    <td>INR/m</td>
                    <td>793800</td>
                    <td>18%</td>
                    <td>142884</td>
                    <td>936684</td>
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
                    <td>877.5</td>
                    <td>877.5</td>
                    <td>935</td>
                    <td>INR/m</td>
                    <td>820463</td>
                    <td>18%</td>
                    <td>147683</td>
                    <td>968146</td>
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
                    <td>180</td>
                    <td>180</td>
                    <td>935</td>
                    <td>INR/m</td>
                    <td>168300</td>
                    <td>18%</td>
                    <td>30294</td>
                    <td>198594</td>
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