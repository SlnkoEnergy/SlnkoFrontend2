import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Dropdown from "@mui/joy/Dropdown";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import * as React from "react";
import Checkbox from "@mui/joy/Checkbox";
import Chip from '@mui/joy/Chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import { useEffect, useState } from "react";







function PaymentRequest() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [states, setStates] = useState([]);
  // const [customers, setCustomers] = useState([]);
  // const [stateFilter, setStateFilter] = useState("");
  // const [customerFilter, setCustomerFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [projects, setProjects] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [accountNumber, setAccountNumber] = useState([]);
  const [ifscCode, setIfscCode] = useState([]);




  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>State</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by state"
          // value={stateFilter}
          // onChange={(e) => setStateFilter(e.target.value)}
        >
          <Option value="">All</Option>
          {/* {states.map((state, index) => (
            <Option key={index} value={state}>
              {state}
            </Option>
          ))} */}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by customer"
          // value={customerFilter}
          // onChange={(e) => setCustomerFilter(e.target.value)}
        >
          <Option value="">All</Option>
          {/* {customers.map((customer, index) => (
            <Option key={index} value={customer}>
              {customer}
            </Option>
          ))} */}
        </Select>
      </FormControl>
    </>
  );

  useEffect(() => {
    const fetchPaymentsAndProjects = async () => {
      setLoading(true);
      try {
        const [paymentResponse, projectResponse] = await Promise.all([
          axios.get("http://147.93.20.206:8080/v1/get-pay-summary"),
          axios.get("http://147.93.20.206:8080/v1/get-all-project"),
        ]);
        setPayments(paymentResponse.data.data);
        console.log("Payment Data are:", paymentResponse.data.data);
        
        setProjects(projectResponse.data.data);
        console.log("Project Data are:", projectResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPaymentsAndProjects();
  }, []);

  useEffect(() => {
    if (payments.length > 0 && projects.length > 0) {
      const merged = payments.map((payment) => {
        const matchingProject = projects.find(
          (project) => project.p_id === payment.p_id
        );
        return {
          ...payment,
          projectCode: matchingProject?.code || "-", 
          projectName: matchingProject?.name || "-", 
          // projectCustomer: matchingProject?.customer || "-", 
          // projectGroup: matchingProject?.p_group || "-", 
        };
      });
      setMergedData(merged);
    }
  }, [payments, projects]);
  
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelected(mergedData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleRowSelect = (id, isSelected) => {
    setSelected((prevSelected) =>
      isSelected
        ? [...prevSelected, id]
        : prevSelected.filter((item) => item !== id)
    );
  };
  const generatePageNumbers = (currentPage, totalPages) => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(1);
    }

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };
  const totalPages = Math.ceil(mergedData.length / itemsPerPage);

  
 
  const paginatedPayments = mergedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /*****Account Match Logic ******/
  const AccountMatch = ({ payment, onValidationChange }) => {
    const [localAccNumber, setLocalAccNumber] = React.useState(payment.acc_number || "");
    const [localIFSC, setLocalIFSC] = React.useState(payment.ifsc || "");
    const [utr, setUtr] = React.useState(payment.utr || ""); // Track UTR dynamically
    const [error, setError] = React.useState(null);
    const [isMatched, setIsMatched] = React.useState(payment.acc_match === "matched");
  
    const handleMatchSubmit = async (e) => {
      e.preventDefault();
      setError(null);
  
      // Validate account details before submitting
      if (!localAccNumber || !localIFSC) {
        setError("Account Number and IFSC are required.");
        return;
      }
  
      try {
        const response = await axios.put("http://147.93.20.206:8080/v1/acc-matched", {
          acc_number: localAccNumber,
          ifsc: localIFSC,
        });
  
        if (response.data?.status === "matched") {
          payment.acc_match = "matched";
          setIsMatched(true); // Account is matched
          onValidationChange(payment.pay_id, true); // Enable UTR field in parent
        } else {
          payment.acc_match = "not_matched";
          setIsMatched(false); // Account is not matched
          onValidationChange(payment.pay_id, false); // Disable UTR field in parent
        }
      } catch (err) {
        console.error("Error in account match validation:", err);
        setError("Failed to validate account. Please try again.");
      }
    };
  
    const handleUtrSubmit = async (e) => {
      e.preventDefault();
      setError(null);
  
      if (utr.trim() === "") {
        setError("UTR cannot be empty.");
        return;
      }
  
      try {
        console.log("Submitting UTR: ", utr); // Debug log to check the UTR value
        const response = await axios.put("http://147.93.20.206:8080/v1/utr-update", {
          pay_id: payment.pay_id, // Include pay_id if necessary
          utr,
        });
  
        if (response.status === 200) {
          payment.utr = utr; // Update the payment object with the submitted UTR
          console.log("UTR Updated Successfully:", utr);
          setError("UTR successfully updated."); // Display success message
        } else {
          setError("Failed to update UTR. Please try again.");
        }
      } catch (err) {
        console.error("Error in UTR update:", err);
        setError("Failed to update UTR. Please try again.");
      }
    };
  
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 250, padding: 1 }}>
          {/* Ensure the form tag is wrapping everything correctly */}
          <form onSubmit={isMatched ? handleUtrSubmit : handleMatchSubmit}>
            <Input
              placeholder="Account Number"
              name="acc_number"
              value={localAccNumber}
              onChange={(e) => setLocalAccNumber(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
              disabled={isMatched} // Disable input if matched
            />
  
            <Input
              placeholder="IFSC Code"
              name="ifsc"
              value={localIFSC}
              onChange={(e) => setLocalIFSC(e.target.value)}
              sx={{ width: "100%", marginBottom: "1rem" }}
              disabled={isMatched} // Disable input if matched
            />
  
            {error && (
              <MenuItem sx={{ color: error.includes("successfully") ? "green" : "red", fontSize: "0.875rem" }}>
                {error}
              </MenuItem>
            )}
  
            {isMatched && (
              <Input
                placeholder="UTR"
                name="utr"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                sx={{ width: "100%", marginBottom: "1rem" }}
                disabled={false} // Always allow UTR updates
              />
            )}
  
            <MenuItem>
              <Button
                type="submit"
                variant="solid"
                color="primary"
                size="sm"
                sx={{ width: "100%" }}
              >
                {isMatched ? "Submit UTR" : "Match"}
              </Button>
            </MenuItem>
          </form>
        </Menu>
      </Dropdown>
    );
  };
  

  
  
/*****UTR Enabled ******/
const PaymentRow = ({ payment }) => {
  const [utrEnabled, setUTREnabled] = React.useState(payment.acc_match === "matched");

  const handleValidationChange = (id, enabled) => {
    if (payment.pay_id === id) {
      setUTREnabled(enabled); // Update UTR enablement for this row
    }
  };

  return (
    <Box component="tr" sx={{ "&:hover": { backgroundColor: "neutral.plainHoverBg" } }}>
      <Box component="td" sx={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
        <Checkbox
          size="sm"
          checked={selected.includes(payment.pay_id)}
          onChange={(event) => handleRowSelect(payment.pay_id, event.target.checked)}
        />
      </Box>

      {/* Other Table Cells */}

      <Box component="td" sx={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
        <AccountMatch payment={payment} onValidationChange={handleValidationChange} />
      </Box>
      <Box component="td" sx={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
        <MatchRow payment={payment} />
      </Box>
      <Box component="td" sx={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
        <Input
          placeholder="Enter UTR"
          disabled={!utrEnabled} // Enable if acc_match === "matched"
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};

/***** Match Logic ******/
  const MatchRow = ({ payment }) => (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        payment.acc_match === "matched" ? (
          <CheckRoundedIcon />
        ) : (
          <BlockIcon />
        )
      }
      color={payment.acc_match === "matched" ? "success" : "neutral"}
    >
      {payment.acc_match === "matched" ? payment.acc_match : "match"}
    </Chip>
  );


  return (
    <>
      {/* Mobile Filters */}
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>

      {/* Tablet and Up Filters */}
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search here</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>

      {/* Table */}
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {error ? (
        <Typography color="danger" textAlign="center">
          {error}
        </Typography>
      ) : loading ? (
        <Typography textAlign="center">Loading...</Typography>
      ) : (
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
          <Box component="thead" sx={{ backgroundColor: "neutral.softBg" }}>
            <Box component="tr">
              <Box
                component="th"
                sx={{
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <Checkbox
                  size="sm"
                  checked={selected.length === paginatedPayments.length}
                  onChange={(event) => handleRowSelect("all", event.target.checked)}
                  indeterminate={
                    selected.length > 0 && selected.length < paginatedPayments.length
                  }
                />
              </Box>
              {[
               "Payment Id",
                "Project Id",
                "Project Name",
                "Requested For",
                "Vendor",
                "Payment Description",
                "Requested Amount",
                "Bank Detail",
                "Validation",
                "UTR",
              ].map((header, index) => (
                <Box
                  component="th"
                  key={index}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {header}
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="tbody">
          {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment,index) => (
                  
                <Box
                  component="tr"
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "neutral.plainHoverBg" },
                  }}
                >
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                     <Checkbox
                        size="sm"
                        checked={selected.includes(payment.pay_id)}
                        onChange={(event) => handleRowSelect(payment.pay_id, event.target.checked)}
                      />
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.pay_id}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.projectCode}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.projectName || "-"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.paid_for || "-"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.vendor || "-"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {payment.comment || "-"}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {new Intl.NumberFormat("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(payment.amt_for_customer)}
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <AccountMatch payment={payment} />
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    <MatchRow payment={payment} />
                  </Box>
                  <Box
                    component="td"
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    
                  </Box>
                </Box>
              ))
            ) : (
              <Box component="tr">
                <Box
                  component="td"
                  colSpan={9}
                  sx={{
                    padding: "8px",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  No data available
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
      </Sheet>

      {/* Pagination */}
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: { xs: "none", md: "flex" },
          alignItems: "center",
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Box
          sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 1 }}
        >
          {generatePageNumbers(currentPage, totalPages).map((page, index) =>
            typeof page === "number" ? (
              <IconButton
                key={index}
                size="sm"
                variant={page === currentPage ? "contained" : "outlined"}
                color="neutral"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </IconButton>
            ) : (
              <Typography key={index} sx={{ px: 1, alignSelf: "center" }}>
                {page}
              </Typography>
            )
          )}
        </Box>
        {/* <Box sx={{ flex: 1, display: "flex", justifyContent: "center", gap: 1 }}>
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <IconButton
        key={page}
        size="sm"
        variant={page === currentPage ? "contained" : "outlined"}
        color="neutral"
        onClick={() => handlePageChange(page)}
      >
        {page}
      </IconButton>
    ))}
  </Box> */}

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
export default PaymentRequest;
