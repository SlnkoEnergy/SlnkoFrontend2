import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Select,
  Option,
  FormLabel,
  Input,
} from "@mui/joy";
import axios from "axios";
import Img1 from "../../Assets/Add New Module.png";

const itemNameOptionsByCategory = {
  "Module Materials": ["Module", "MC4 Connector", "Module Mounting Structure"],
  "Inverter Materials": ["Inverter"],
  "Tranfo Materials": ["Transformer"],
  "LT Panel": ["LT Panel"],
  "HT Panel": ["HT Panel"],
  "AC Cable": ["AC Cable"],
  "DC Cable": ["DC Cable"],
  "MMS": ["Module Mounting Structure"],
  "Fastener": ["Module Mounting & MMS Hardware"],
};

const AddBOMForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    make: "",
    rating: "",
    voltageRating: "",
    core: "",
    size: "",
    quantity: "",
    uom: "",
  });
  const [inverterData, setInverterData] = useState([]); // Add this line to define inverterData

  const [makeOptions, setMakeOptions] = useState([]);
  const [moduleData, setModuleData] = useState([]); // NEW: Stores full module master data
  const [transformerData, setTransformerData] = useState([]);
  const [ltPanelData, setLtPanelData] = useState([]);
  const [htPanelData, setHtPanelData] = useState([]); // NEW: Stores full HT Panel data
  const [dropdownOptions, setDropdownOptions] = useState({
    category: [
      "Module Materials",
      "Inverter Materials",
      "Tranfo Materials",
      "LT Panel",
      "HT Panel",
      "AC Cable",
      "DC Cable",
      "MMS",
      "Fastener"
    ],
    make: ["Slnko", "Client", "Other"],
    rating: ["1kW", "2kW", "5kW"],
    voltageRating: [],
    uom: ["Nos", "Mtr", "Set"],
    core: [],
    size: [],
    quantity: Array.from({ length: 100 }, (_, i) => (i + 1).toString()),
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  
    // Reset dependent fields when category changes
    if (field === "category") {
      setFormData((prev) => ({ ...prev, itemName: "", make: "", rating: "" }));
  
      if (value === "Module Materials") {
        fetchMakeOptionsFromModule();
      } else if (value === "Inverter Materials") {
        fetchMakeOptionsFromInverter();
      } else if (value === "DC Cable") {
        fetchMakeOptionsFromDCCable();
      } else if (value === "AC Cable") {
        fetchMakeOptionsFromACCable();
      } else if (value === "Tranfo Materials") {
        fetchMakeOptionsFromTransformer();
      } else if (value === "HT Panel") {
        fetchMakeOptionsFromHTPanel();
      } else if (value === "LT Panel") {
        fetchMakeOptionsFromLTPanel();
      } else {
        setMakeOptions([]);
      }
    }
  
    // Populate rating dropdown when Make is selected under Module Materials
    if (field === "make" && formData.category === "Module Materials") {
      const filteredRatings = moduleData
        .filter((item) => item.make === value)
        .map((item) => item.power)
        .filter(Boolean);
      const uniqueRatings = [...new Set(filteredRatings)];
  
      setDropdownOptions((prev) => ({
        ...prev,
        rating: uniqueRatings.length > 0 ? uniqueRatings : ["No Ratings Found"],
      }));
    }
  
    // ✅ NEW: Populate rating dropdown when Make is selected under Inverter Materials
    if (field === "make" && formData.category === "Inverter Materials") {
      const filteredRatings = inverterData
        .filter((item) => item.inveter_make === value)
        .map((item) => item.inveter_size)
        .filter(Boolean);
      const uniqueRatings = [...new Set(filteredRatings)];
  
      setDropdownOptions((prev) => ({
        ...prev,
        rating: uniqueRatings.length > 0 ? uniqueRatings : ["No Ratings Found"],
      }));
    }

    //Transformer//
if (field === "make" && formData.category === "Tranfo Materials") {
  const filteredRatings = transformerData
    .filter((item) => item.make === value)
    .map((item) => item.size)
    .filter(Boolean);
  const uniqueRatings = [...new Set(filteredRatings)];

  setDropdownOptions((prev) => ({
    ...prev,
    rating: uniqueRatings.length > 0 ? uniqueRatings : ["No Ratings Found"],
  }));
}


 
  // LT Panel //
if (field === "make" && formData.category === "LT Panel") {
  const filteredTypes = ltPanelData
    .filter((item) => item.make === value)
    .map((item) => item.type) // Use `type` as per your data model
    .filter(Boolean);
  const uniqueTypes = [...new Set(filteredTypes)];

  setDropdownOptions((prev) => ({
    ...prev,
    rating: uniqueTypes.length > 0 ? uniqueTypes : ["No Types Found"], // Use rating instead of type for dropdown
  }));
}

// HT Panel //
if (field === "make" && formData.category === "HT Panel") {
  const filteredTypes = htPanelData
    .filter((item) => item.make === value)
    .map((item) => item.type) // Use `type` as per your data model
    .filter(Boolean);
  const uniqueTypes = [...new Set(filteredTypes)];

  setDropdownOptions((prev) => ({
    ...prev,
    rating: uniqueTypes.length > 0 ? uniqueTypes : ["No Types Found"], // Use rating dropdown for `type` values
  }));
}


  };
      
  
 
  

  const fetchMakeOptionsFromModule = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-module-master"
      );
      const data = response.data.data;

      const makes = [
        ...new Set(data.map((item) => item.make).filter(Boolean)),
      ];

      setMakeOptions(makes);
      setModuleData(data); // Store full module data for later filtering
    } catch (error) {
      console.error("Error fetching module make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromInverter = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-master-inverter"
      );
      const data = response.data.data;

      const makes = [
        ...new Set(
          response.data.data.map((item) => item.inveter_make).filter(Boolean)
        ),
      ];
      setMakeOptions(makes);
      setInverterData(data); // ✅ This is what's missing
    } catch (error) {
      console.error("Error fetching inverter make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromDCCable = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-dc-cabel-master"
      );
      const data = response.data.data;

      const makes = [...new Set(data.map(item => item.make).filter(Boolean))];
      const cores = [...new Set(data.map(item => item.core).filter(Boolean))];
      const sizes = [...new Set(data.map(item => item.size).filter(Boolean))];

      setMakeOptions(makes);
      setDropdownOptions(prev => ({
        ...prev,
        core: cores,
        size: sizes,
      }));
    } catch (error) {
      console.error("Error fetching DC cable make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromACCable = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-accabel-master"
      );
      const data = response.data.data;

      const makes = [...new Set(data.map(item => item.make).filter(Boolean))];
      const cores = [...new Set(data.map(item => item.core).filter(Boolean))];
      const sizes = [...new Set(data.map(item => item.size).filter(Boolean))];
      const voltageRatings = [...new Set(data.map(item => item.voltage_rating).filter(Boolean))];

      setMakeOptions(makes);
      setDropdownOptions(prev => ({
        ...prev,
        core: cores,
        size: sizes,
        voltageRating: voltageRatings,
      }));
    } catch (error) {
      console.error("Error fetching AC cable make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromTransformer = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-transformer"
      );
      const data = response.data.data;

      const makes = [
        ...new Set(response.data.data.map((item) => item.make).filter(Boolean)),
      ];
      setMakeOptions(makes);
      setTransformerData(data);
    } catch (error) {
      console.error("Error fetching Transformer make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromHTPanel = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-htpanel-master"
      );
      const data = response.data.data;
      const makes = [
        ...new Set(response.data.data.map((item) => item.make).filter(Boolean)),
      ];
      setMakeOptions(makes);
    } catch (error) {
      console.error("Error fetching HT Panel make options:", error);
      setMakeOptions([]);
    }
  };

  const fetchMakeOptionsFromLTPanel = async () => {
    try {
      const response = await axios.get(
        "https://api.slnkoprotrac.com/v1/get-ltpanel-master"
      );
      const data = response.data.data; // ✅ define it like this

      const makes = [
        ...new Set(response.data.data.map((item) => item.make).filter(Boolean)),
      ];
      setMakeOptions(makes);
      setLtPanelData(data);
    } catch (error) {
      console.error("Error fetching LT Panel make options:", error);
      setMakeOptions([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { bom: [formData] };
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/add-bom-master",
        payload
      );
      console.log("BOM submitted:", response.data);
    } catch (error) {
      console.error("Error submitting BOM:", error);
    }
  };

  const { category } = formData;
  const isDCCable = category === "DC Cable";
  const isACCable = category === "AC Cable";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: "background.body" }}
    >
      <Card variant="outlined" sx={{ p: 4, width: "100%", maxWidth: 800 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography level="h4">Add Bill of Materials (BOM)</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img src={Img1} width="30px" height="30px" alt="Module" />
        </Box>
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormLabel>Category</FormLabel>
              <Select
                value={formData.category}
                onChange={(e, val) => handleChange("category", val)}
                placeholder="Select Category"
                required
              >
                {dropdownOptions.category.map((option, i) => (
                  <Option key={i} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormLabel>Item Name</FormLabel>
              <Select
                value={formData.itemName}
                onChange={(e, val) => handleChange("itemName", val)}
                placeholder="Select Item Name"
                required
              >
                {(itemNameOptionsByCategory[category] || []).map((option, i) => (
                  <Option key={i} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Grid>

            {/* Make */}
            <Grid xs={12} sm={6}>
              <FormLabel>Make</FormLabel>
              {(category === "MMS" || category === "Fastener") ? (
                <Input
                  value={formData.make}
                  onChange={(e) => handleChange("make", e.target.value)}
                  placeholder="Enter Make"
                  required
                />
              ) : (
                <Select
                  value={formData.make}
                  onChange={(e, val) => handleChange("make", val)}
                  placeholder="Select Make"
                  required
                >
                  {(makeOptions.length > 0 ? makeOptions : dropdownOptions.make).map(
                    (option, i) => (
                      <Option key={i} value={option}>
                        {option}
                      </Option>
                    )
                  )}
                </Select>
              )}
            </Grid>

            {/* Rating */}
            {!isDCCable && !isACCable && (
              <Grid xs={12} sm={6}>
                <FormLabel>Rating</FormLabel>
                {(category === "MMS" || category === "Fastener") ? (
                  <Input
                    value={formData.rating}
                    onChange={(e) => handleChange("rating", e.target.value)}
                    placeholder="Enter Rating"
                  />
                ) : (
                  <Select
                    value={formData.rating}
                    onChange={(e, val) => handleChange("rating", val)}
                    placeholder="Select Rating"
                  >
                    {dropdownOptions.rating.map((option, i) => (
                      <Option key={i} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Grid>
            )}

            {["quantity", "uom"].map((field) => (
              <Grid xs={12} sm={6} key={field}>
                <FormLabel>{field.toUpperCase()}</FormLabel>
                {(category === "MMS" || category === "Fastener") && field === "quantity" ? (
                  <Input
                    value={formData[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={`Enter ${field}`}
                    required
                  />
                ) : (
                  <Select
                    value={formData[field]}
                    onChange={(e, val) => handleChange(field, val)}
                    placeholder={`Select ${field}`}
                    required
                  >
                    {dropdownOptions[field].map((option, i) => (
                      <Option key={i} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Grid>
            ))}

            {(isDCCable || isACCable) && (
              <>
                <Grid xs={12} sm={6}>
                  <FormLabel>Core</FormLabel>
                  <Select
                    value={formData.core}
                    onChange={(e, val) => handleChange("core", val)}
                    placeholder="Select Core"
                    required
                  >
                    {dropdownOptions.core.map((option, i) => (
                      <Option key={i} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Grid>

                <Grid xs={12} sm={6}>
                  <FormLabel>Size</FormLabel>
                  <Select
                    value={formData.size}
                    onChange={(e, val) => handleChange("size", val)}
                    placeholder="Select Size"
                    required
                  >
                    {dropdownOptions.size.map((option, i) => (
                      <Option key={i} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Grid>
              </>
            )}

            {isACCable && (
              <Grid xs={12} sm={6}>
                <FormLabel>Voltage Rating</FormLabel>
                <Select
                  value={formData.voltageRating}
                  onChange={(e, val) => handleChange("voltageRating", val)}
                  placeholder="Select Voltage Rating"
                >
                  {dropdownOptions.voltageRating.map((option, i) => (
                    <Option key={i} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Grid>
            )}

            <Grid xs={12} display="flex" justifyContent="space-between" gap={2}>
              <Button variant="outlined" color="neutral" sx={{ width: "48%" }}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                variant="solid"
                color="success"
                sx={{ width: "48%" }}
              >
                Submit BOM
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddBOMForm;
