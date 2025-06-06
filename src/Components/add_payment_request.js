import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Input,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import Img9 from "../Assets/solar.png";

function PaymentRequestForm() {
  const [projectIDs, setProjectIDs] = useState([]);
  const [poNumbers, setPoNumbers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedPoDetails, setSelectedPoDetails] = useState({});
  const [formData, setFormData] = useState({
    projectID: "",
    name: "",
    customer: "",
    p_group: "",
    pay_id: "",
    pay_type: "",
    po_number: "",
    amountRequested: "",
    amt_for_customer: "",
    dbt_date: "",
    item: "",
    vendor: "",
    paymentDescription: "",
    po_value: "",
    amount_paid: "",
    currentPoBalance: "",
    Beneficiary_Name: "",
    Account_No: "",
    IFSC_Code: "",
    Bank_Name: "",
    paymentMode: "Account Transfer", // Default value for payment mode
  });

  useEffect(() => {
    const fetchProjectIDs = async () => {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-projecT-IT");
        console.log("Project IDs fetched:", response.data);
        setProjectIDs(response.data.data || []);
      } catch (error) {
        console.error("Error fetching project IDs:", error);
      }
    };

    const fetchPoNumbers = async () => {
      try {
        const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-pO-IT");
        console.log("PO Numbers fetched:", response.data);
        setPoNumbers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching PO numbers:", error);
      }
    };

    fetchProjectIDs();
    fetchPoNumbers();
  }, []);

  const getVendorDetails = async (vendorName) => {
    try {
      const response = await axios.get("https://api.slnkoprotrac.com/v1/get-all-vendoR-IT");
      console.log("All vendor details fetched:", response.data);

      const matchedVendor = response.data.data?.find(
        (vendor) => vendor.name === vendorName
      );

      if (matchedVendor) {
        console.log(`Vendor details found for ${vendorName}:`, matchedVendor);
        return matchedVendor;
      } else {
        console.warn(`No details found for vendor: ${vendorName}`);
        return {};
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      return {};
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

// Handle conditional logic for pay_type
if (name === "po_number" && value) {
  const selectedPo = poNumbers.find((po) => po.po_number === value);
  if (selectedPo) {
    console.log("Selected PO details:", selectedPo);
    setSelectedPoDetails(selectedPo);
    const currentPoBalance = selectedPo.po_value - selectedPo.amount_paid;

    setFormData((prev) => ({
      ...prev,
      item: selectedPo.item || "",
      vendor: selectedPo.vendor || "",
      po_value: selectedPo.po_value || "",
      amount_paid: selectedPo.amount_paid || "",
      currentPoBalance: currentPoBalance !== null && currentPoBalance !== undefined ? currentPoBalance : "",
    }));

    // Fetch beneficiary details
    if (selectedPo.vendor) {
      console.log("Fetching details for vendor:", selectedPo.vendor);
      getVendorDetails(selectedPo.vendor).then((vendorDetails) => {
        console.log("Fetched beneficiary details:", vendorDetails);
        setFormData((prev) => ({
          ...prev,
          Beneficiary_Name: vendorDetails.Beneficiary_Name || "",
          Account_No: vendorDetails.Account_No || "",
          IFSC_Code: vendorDetails.IFSC_Code || "",
          Bank_Name: vendorDetails.Bank_Name || "",
          paymentMode: "Account Transfer", // Set payment mode automatically
        }));
      });
    }

    // Fetch Project Details using p_id from PO API
    const matchingProject = projectIDs.find((project) => project.code === selectedPo.p_id);
    if (matchingProject) {
      console.log("Matched Project details from PO p_id:", matchingProject);
      setFormData((prev) => ({
        ...prev,
        projectID: matchingProject.code || "", // Update Project ID
        name: matchingProject.name || "",
        customer: matchingProject.customer || "",
        p_group: matchingProject.p_group || "",
      }));
    } else {
      console.warn("No matching project found for p_id:", selectedPo.p_id);
    }
  } else {
    console.warn("PO number not found in the list:", value);
  }
}


  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    try {
      const response = await axios.post(
        "https://api.slnkoprotrac.com/v1/add-pay-requesT-IT",
        formData
      );
      console.log("Payment request submitted successfully:", response.data);
      // Handle success (show a success message, reset the form, etc.)
    } catch (error) {
      console.error("Error submitting payment request:", error);
      // Handle error (show an error message, etc.)
    }
  };
  

  

  return (
    <CssBaseline>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Sheet
          sx={{
            p: 3,
            borderRadius: "md",
            boxShadow: "sm",
            bgcolor: "background.level1",
          }}
        >
          <Box textAlign="center" sx={{ mb: 4 }}>
            <img
              src={Img9}
              alt="Logo"
              style={{
                height: "50px",
                marginBottom: "10px",
                maxWidth: "100%",
              }}
            />

            <Typography level="h4" fontWeight="bold" color="warning">
              Payment Request Form
            </Typography>
            <Divider inset="none" sx={{ width: "50%", margin: "8px auto" }} />
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <Select
                  name="projectID"
                  value={formData.projectID}
                  onChange={(e, value) =>
                    handleChange({ target: { name: "projectID", value } })
                  }
                  placeholder="Project ID"
                  required
                >
                  {projectIDs.map((project) => (
                    <Option key={project._id} value={project.code}>
                      {project.code}
                    </Option>
                  ))}
                </Select>
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="projectName"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Project Name"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="clientName"
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="Client Name"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="groupName"
                  value={formData.p_group}
                  onChange={handleChange}
                  placeholder="Group Name"
                  
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="paymentID"
                  value={formData.pay_id}
                  onChange={handleChange}
                  placeholder="Payment ID"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Select
                  name="pay_type"
                  value={formData.pay_type}
                  onChange={(e, value) =>
                    handleChange({ target: { name: "pay_type", value } })
                  }
                  placeholder="Payment Type"
                  required
                >
                  <Option value="against_po">Payment Against PO</Option>
                  <Option value="adjustment">Adjustment</Option>
                   <Option value="slnko_service_charge">Slnko Service Charge</Option>
                  <Option value="Other">Other</Option> 
                </Select>
              </Grid>

              <Grid xs={12} sm={4}>
  <Select
    name="po_number"
    value={formData.po_number}
    onChange={(e, value) => handleChange({ target: { name: "po_number", value } })}
    placeholder="PO Number"
    disabled={formData.pay_type === "adjustment"} // Disable if payment type is adjustment
  >
    {poNumbers.map((po) => (
      <Option key={po._id} value={po.po_number}>
        {po.po_number}
      </Option>
    ))}
    {/* If PO number is set to N/A, show that as an option */}
    {formData.pay_type === "adjustment" && (
      <Option value="N/A">N/A</Option>
    )}
  </Select>
</Grid>


              <Grid xs={12} sm={4}>
                <Input
                  type="number"
                  name="amountRequested"
                  value={formData.amountRequested}
                  onChange={handleChange}
                  placeholder="Amount Requested (INR)"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  type="number"
                  name="amountForCustomers"
                  value={formData.amt_for_customer}
                  onChange={handleChange}
                  placeholder="Amount for Customers (INR)"
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  type="date"
                  name="requestDate"
                  value={formData.dbt_date}
                  onChange={handleChange}
                  placeholder="Request Date"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="requestedFor"
                  value={formData.item}
                  onChange={handleChange}
                  placeholder="Requested For"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  placeholder="Vendor/Credited to"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="paymentDescription"
                  value={formData.paymentDescription}
                  onChange={handleChange}
                  placeholder="Payment Description"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="poValue"
                  value={formData.po_value}
                  onChange={handleChange}
                  placeholder="PO Value"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="totalAdvancePaid"
                  value={formData.amount_paid}
                  onChange={handleChange}
                  placeholder="Total Advance Paid"
                  required
                />
              </Grid>

              <Grid xs={12} sm={4}>
                <Input
                  name="currentPoBalance"
                  value={formData.currentPoBalance}
                  onChange={handleChange}
                  placeholder="Current PO Balance"
                  required
                />
              </Grid>

              <Grid xs={12}>
                <Typography level="h6" sx={{ mt: 2, mb: 1 }}>
                  Beneficiary Details
                </Typography>
              </Grid>

              <Grid xs={12} sm={12}>
                <Input
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  placeholder="Payment Mode"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="beneficiaryName"
                  value={formData.Beneficiary_Name}
                  onChange={handleChange}
                  placeholder="Beneficiary Name"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="beneficiaryAccountNumber"
                  value={formData.Account_No}
                  onChange={handleChange}
                  placeholder="Beneficiary Account Number"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="beneficiaryIfscCode"
                  value={formData.IFSC_Code}
                  onChange={handleChange}
                  placeholder="Beneficiary IFSC Code"
                  required
                />
              </Grid>

              <Grid xs={12} sm={6}>
                <Input
                  name="bankName"
                  value={formData.Bank_Name}
                  onChange={handleChange}
                  placeholder="Bank Name"
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Grid>
                <Button type="submit" variant="solid" color="primary">
                  Submit
                </Button>
              </Grid>

              <Grid>
                <Button variant="outlined" color="neutral">
                  StandBy
                </Button>
              </Grid>

              <Grid>
                <Button variant="outlined" color="neutral">
                  Back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Sheet>
      </Container>
    </CssBaseline>
  );
}

export default PaymentRequestForm;
