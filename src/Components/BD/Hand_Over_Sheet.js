import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Input,
  Button,
  Sheet,
  Select,
  Option,
} from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Img1 from "../../Assets/HandOverSheet_Icon.jpeg";

const HandoverSheetForm = ({ onBack }) => {
  const [expanded, setExpanded] = useState(null);
  const [formData, setFormData] = useState({
    customer_details: {
      project_id: "",
      project_name: "",
      epc_developer: "",
      site_address_pincode: "",
      site_google_coordinates: "",
      contact_no: "",
      gst_no: "",
      billing_address: "",
    },
    order_details: {
      type_business: "",
      tender_name: "",
      discom_name: "",
      design_date: "",
    },
    project_detail: {
      project_type: "",
      module_make_capacity: "",
      module_make: "",
      module_capacity: "",
      evacuation_voltage: "",
      inverter_make_capacity: "",
      inverter_make: "",
      inverter_type: "",
      work_by_slnko: "",
      topography_survey: "",
      soil_test: "",
      purchase_supply_net_meter: "",
      liaisoning_net_metering: "",
      ceig_ceg: "",
      project_completion_date: "",
      proposed_dc_capacity: "",
      transmission_line: "",
      substation_name: "",
      overloading: "",
    },
    commercial_details: {
      type: "",
      subsidy_amount: "",
    },
    attached_details: {
      taken_over_by: "",
      cam_member_name: "",
      loa_number: "",
      ppa_number: "",
      submitted_by_BD: "",
    },
  });
  const [moduleMakeOptions, setModuleMakeOptions] = useState([]);
  const [moduleCapacityOptions, setModuleCapacityOptions] = useState([]);
  const [inverterMakeOptions, setInverterMakeOptions] = useState([]);
  const [inverterTypeOptions, setInverterTypeOptions] = useState([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const moduleResponse = await axios.get("/api/master/module");
        setModuleMakeOptions(moduleResponse.data.moduleMake);
        setModuleCapacityOptions(moduleResponse.data.moduleCapacity);

        const inverterResponse = await axios.get("/api/master/inverter");
        setInverterMakeOptions(inverterResponse.data.inverterMake);
        setInverterTypeOptions(inverterResponse.data.inverterType);
      } catch (error) {
        console.error("Error fetching master data:", error);
      }
    };
    fetchMasterData();
  }, []);

  const handleExpand = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/create-hand-over-sheet",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed");
    }
  };

  const sections = [
    {
      name: "Customer Details",
      fields: [
       
      ],
    },
    {
      name: "Order Details",
      fields: [],
    },
    {
      name: "Project Details",
      fields: [
        "Proposed DC Capacity (KWp)",
        "Transmission Line",
        "Substation Name",
        "Overloading",
      ],
    },
    {
      name: "Commercial Details",
      fields: ["Subsidy Amount"],
    },
    {
      name: "Attached Details",
      fields: ["CAM Member Name", "LOA Number", "PPA Number", "HandedOver By"],
    },
  ];

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
      }}
    >
      {/* Icon with Spacing */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <img src={Img1} alt="Handover Icon" style={{ width: 65, height: 65 }} />
      </div>

      {/* Form Title */}
      <Typography
        level="h3"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 5, fontWeight: "bold" }}
      >
        Handover Sheet
      </Typography>
      
      {/* Dynamic Sections */}
      {sections.map((section, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={() => handleExpand(index)}
          sx={{ marginBottom: 1.5 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: "#e0e0e0", padding: 1.5 }}
          >
            <Typography level="h5" sx={{ fontWeight: "bold" }}>
              {section.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 2.5 }}>
            <Grid container spacing={2}>
              {section.name === "Customer Details" && (
                <>
                <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Project ID</Typography>
              <Input
                fullWidth
                placeholder="Project ID"
                value={formData.customer_details.project_id}
                onChange={(e) => handleChange("customer_details", "project_id", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Name</Typography>
              <Input
                fullWidth
                placeholder="Name"
                value={formData.customer_details.project_name}
                onChange={(e) => handleChange("customer_details", "project_name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>EPC/Developer</Typography>
              <Input
                fullWidth
                placeholder="EPC/Developer"
                value={formData.customer_details.epc_developer}
                onChange={(e) => handleChange("customer_details", "epc_developer", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Site Address with Pin Code</Typography>
              <Input
                fullWidth
                placeholder="Site Address with Pin Code"
                value={formData.customer_details.site_address_pincode}
                onChange={(e) => handleChange("customer_details", "site_address_pincode", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Site Google Coordinates</Typography>
              <Input
                fullWidth
                placeholder="Site Google Coordinates"
                value={formData.customer_details.site_google_coordinates}
                onChange={(e) => handleChange("customer_details", "site_google_coordinates", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Contact No.</Typography>
              <Input
                fullWidth
                placeholder="Contact No."
                value={formData.customer_details.contact_no}
                onChange={(e) => handleChange("customer_details", "contact_no", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>GST No.</Typography>
              <Input
                fullWidth
                placeholder="GST No."
                value={formData.customer_details.gst_no}
                onChange={(e) => handleChange("customer_details", "gst_no", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography level="body1" sx={{ fontWeight: "bold", marginBottom: 0.5 }}>Billing Address</Typography>
              <Input
                fullWidth
                placeholder="Billing Address"
                value={formData.customer_details.billing_address}
                onChange={(e) => handleChange("customer_details", "billing_address", e.target.value)}
              />
            </Grid>
                </>
              )}
              {/* Handle special case for "Type of Business" dropdown */}
              {section.name === "Order Details" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Type of Business
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Select Type of Business"
                      value={formData.order_details.type_business || ""}
                      onChange={(e, newValue) =>
                        handleChange("order_details", "type_business", newValue)
                      }
                      sx={{
                        padding: 1.2,
                        fontSize: "1rem",
                        backgroundColor: "#fff",
                        borderRadius: "md",
                      }}
                    >
                      <Option value="Commercial">Commercial</Option>
                      <Option value="Tender">Tender</Option>
                      <Option value="Consumer">Consumer</Option>
                    </Select>
                  </Grid>

                  {/* Integrated Order Details Fields */}
                  <Grid item xs={12} sm={6}>
                    <Typography>Tender Name</Typography>
                    <Input
                      value={formData.order_details.tender_name}
                      onChange={(e) =>
                        handleChange(
                          "order_details",
                          "tender_name",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>DISCOM Name</Typography>
                    <Input
                      value={formData.order_details.discom_name}
                      onChange={(e) =>
                        handleChange(
                          "order_details",
                          "discom_name",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Preliminary Design Sign-off Date</Typography>
                    <Input
                      type="date"
                      value={formData.order_details.design_date}
                      onChange={(e) =>
                        handleChange(
                          "order_details",
                          "design_date",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                </>
              )}
              {/* Handle special case for "Type in Commercial Details */}
              {section.name === "Commercial Details" && (
                <Grid item xs={12} sm={6}>
                  <Typography
                    level="body1"
                    sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                  >
                    Type
                  </Typography>
                  <Select
                    fullWidth
                    placeholder="Type"
                    value={formData["Commercial Details"]?.["Type"] || ""}
                    onChange={(e, newValue) =>
                      handleChange("Commercial Details", "Type", newValue)
                    }
                    sx={{
                      padding: 1.2,
                      fontSize: "1rem",
                      backgroundColor: "#fff",
                      borderRadius: "md",
                    }}
                  >
                    <Option value="CapEx">CapEx</Option>
                    <Option value="Resco">Resco</Option>
                    <Option value="OpEx">OpEx</Option>
                    <Option value="Retainership">Retainership</Option>
                  </Select>
                </Grid>
              )}

              {/* Dropdowns for Project Details */}
              {section.name === "Project Details" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Project Type
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Select Project Type"
                      value={
                        formData["Project Details"]?.["Project Type"] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Project Type",
                          newValue
                        )
                      }
                    >
                      <Option value="On-Grid">On-Grid</Option>
                      <Option value="Off-Grid">Off-Grid</Option>
                      <Option value="Hybrid">Hybrid</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Solar Module Make & Capacity
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Select Module Make & Capacity"
                      value={
                        formData["Project Details"]?.[
                          "Solar Module Make & Capacity"
                        ] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Solar Module Make & Capacity",
                          newValue
                        )
                      }
                    >
                      <Option value="Slnko">Slnko</Option>
                      <Option value="Client">Client</Option>
                      <Option value="NA">NA</Option>
                    </Select>
                  </Grid>
                  {formData["Project Details"]?.[
                    "Solar Module Make & Capacity"
                  ] === "Slnko" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography level="body1">Module Make</Typography>
                        <Select
                          fullWidth
                          value={
                            formData["Project Details"]?.["Module Make"] || ""
                          }
                          onChange={(e, newValue) =>
                            handleChange(
                              "Project Details",
                              "Module Make",
                              newValue
                            )
                          }
                        >
                          {moduleMakeOptions.map((make) => (
                            <Option key={make} value={make}>
                              {make}
                            </Option>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography level="body1">Module Capacity</Typography>
                        <Select
                          fullWidth
                          value={
                            formData["Project Details"]?.["Module Capacity"] ||
                            ""
                          }
                          onChange={(e, newValue) =>
                            handleChange(
                              "Project Details",
                              "Module Capacity",
                              newValue
                            )
                          }
                        >
                          {moduleCapacityOptions.map((capacity) => (
                            <Option key={capacity} value={capacity}>
                              {capacity}
                            </Option>
                          ))}
                        </Select>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Evacuation Voltage
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Evacuation Voltage"
                      value={
                        formData["Project Details"]?.["Evacuation Voltage"] ||
                        ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Evacuation Voltage",
                          newValue
                        )
                      }
                    >
                      <Option value="11 KV">11 KV</Option>
                      <Option value="33 KV">33 KV</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Solar Inverter Make & Capacity
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Select Inverter Make & Capacity"
                      value={
                        formData["Project Details"]?.[
                          "Solar Inverter Make & Capacity"
                        ] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Solar Inverter Make & Capacity",
                          newValue
                        )
                      }
                    >
                      <Option value="Slnko">Slnko</Option>
                      <Option value="Client">Client</Option>
                      <Option value="NA">NA</Option>
                    </Select>
                  </Grid>
                  {formData["Project Details"]?.[
                    "Solar Inverter Make & Capacity"
                  ] === "Slnko" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Typography level="body1">Inverter Make</Typography>
                        <Select
                          fullWidth
                          value={
                            formData["Project Details"]?.["Inverter Make"] || ""
                          }
                          onChange={(e, newValue) =>
                            handleChange(
                              "Project Details",
                              "Inverter Make",
                              newValue
                            )
                          }
                        >
                          {inverterMakeOptions.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography level="body1">Inverter Type</Typography>
                        <Select
                          fullWidth
                          value={
                            formData["Project Details"]?.["Inverter Type"] || ""
                          }
                          onChange={(e, newValue) =>
                            handleChange(
                              "Project Details",
                              "Inverter Type",
                              newValue
                            )
                          }
                        >
                          {inverterTypeOptions.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Work By Slnko
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Work By Slnko"
                      value={
                        formData["Project Details"]?.["Work By Slnko"] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Work By Slnko",
                          newValue
                        )
                      }
                    >
                      <Option value="Eng">Eng</Option>
                      <Option value="EP">EP</Option>
                      <Option value="PMC">PMC</Option>
                      <Option value="EPMC">EPMC</Option>
                      <Option value="All">All</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Site Topography Survey
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Site Topography Survey"
                      value={
                        formData["Project Details"]?.[
                          "Site Topography Survey"
                        ] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Site Topography Survey",
                          newValue
                        )
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Soil Testing
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Soil Testing"
                      value={
                        formData["Project Details"]?.["Soil Testing"] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Soil Testing",
                          newValue
                        )
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Purchase & Supply of Net meter
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Purchase & Supply of Net meter"
                      value={
                        formData["Project Details"]?.[
                          "Purchase & Supply of Net meter"
                        ] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Purchase & Supply of Net meter",
                          newValue
                        )
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Liaisoning for Net-Metering
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="Liaisoning for Net-Metering"
                      value={
                        formData["Project Details"]?.[
                          "Liaisoning for Net-Metering"
                        ] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "Liaisoning for Net-Metering",
                          newValue
                        )
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      CEIG/CEG Scope
                    </Typography>
                    <Select
                      fullWidth
                      placeholder="CEIG/CEG Scope"
                      value={
                        formData["Project Details"]?.["CEIG/CEG Scope"] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Project Details",
                          "CEIG/CEG Scope",
                          newValue
                        )
                      }
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      Project Completion Date
                    </Typography>
                    <Input
                      fullWidth
                      type="date"
                      value={
                        formData["Project Details"]?.[
                          "Project Completion Date"
                        ] || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          "Project Details",
                          "Project Completion Date",
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                </>
              )}

              {/* Handle special case for Attached Details */}
              {section.name === "Attached Details" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      level="body1"
                      sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                    >
                      TakenOver By
                    </Typography>
                    <Select
                      fullWidth
                      value={
                        formData["Attached Details"]?.["TakenOver By"] || ""
                      }
                      onChange={(e, newValue) =>
                        handleChange(
                          "Attached Details",
                          "TakenOver By",
                          newValue
                        )
                      }
                    >
                      <Option value="CAM">CAM</Option>
                    </Select>
                  </Grid>
                </>
              )}

              {/* Render other fields with labels */}
              {section.fields.map((field, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Typography
                    level="body1"
                    sx={{ fontWeight: "bold", marginBottom: 0.5 }}
                  >
                    {field}
                  </Typography>
                  <Input
                    fullWidth
                    placeholder={field}
                    value={formData[section.name]?.[field] ?? ""}
                    onChange={(e) =>
                      handleChange(section.name, field, e.target.value)
                    }
                    sx={{
                      padding: 1.2,
                      fontSize: "1rem",
                      backgroundColor: "#fff",
                      borderRadius: "md",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Buttons */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <Button
            onClick={onBack}
            variant="solid"
            color="neutral"
            fullWidth
            sx={{ padding: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleSubmit}
            variant="solid"
            color="primary"
            fullWidth
            sx={{ padding: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default HandoverSheetForm;
