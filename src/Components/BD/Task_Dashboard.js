import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel, Card, CardContent, Typography, Chip, Box, Grid, Sheet, Checkbox, Modal, ModalDialog, DialogTitle, DialogContent, DialogActions, Button, Textarea } from "@mui/joy";
import { CheckCircle, AccessTime, Person, Phone } from "@mui/icons-material";

const TaskDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState("");

  const tasks = {
    past: [
      { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Meeting", icon: <Person /> },
      { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Call", icon: <Phone /> },
      { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Meeting", icon: <Person /> },
      { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Call", icon: <Phone /> },
      { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Meeting", icon: <Person /> },
      { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Call", icon: <Phone /> },
    ],
    today: [
      { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Call", icon: <Phone /> },
      { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Meeting", icon: <Person /> },
      { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Meeting", icon: <Person /> },
      { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Call", icon: <Phone /> },
      
    ],
    future: [
        { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Call", icon: <Phone /> },
        { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Meeting", icon: <Person /> },
        { name: "Ramesh", company: "Charlie Pvt. Ltd.", location: "Jaipur, Rajasthan", type: "Meeting", icon: <Person /> },
        { name: "Ritesh", company: "Charlie Pvt. Ltd.", location: "Ranchi, Jharkhand", type: "Call", icon: <Phone /> },
    ],
  };

  const handleCheckboxChange = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    console.log("Comment Submitted: ", comment);
    setOpenDialog(false);
    setComment("");
  };

  const getCurrentDate = () => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Sheet sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 4, textAlign: "center", borderRadius: 6, boxShadow: "xl", border: "2px solid #ccc", bgcolor: "background.surface" }}>
        <Typography level="h2" color="primary">Task</Typography>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TabList sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Tab sx={{ flex: 1, textAlign: "left", fontSize: "1.1rem" }}>Past</Tab>
            <Tab sx={{ flex: 1, textAlign: "center", fontSize: "1.1rem" }}>Today's Task</Tab>
            <Tab sx={{ flex: 1, textAlign: "right", fontSize: "1.1rem" }}>Future</Tab>
          </TabList>
          <TabPanel value={0} sx={{ width: "100%" }}>
            <Box>
              <Box display="flex" justifyContent="center" gap={2} mb={3}>
                <Chip startDecorator={<CheckCircle color="success" />} variant="soft" size="lg">20</Chip>
                <Chip startDecorator={<AccessTime color="warning" />} variant="soft" size="lg">10</Chip>
              </Box>
              {tasks.past.map((task, index) => (
                <Card key={index} sx={{ mb: 3, borderLeft: "6px solid blue", borderRadius: 6, boxShadow: "xl", border: "1px solid #bbb", p: 2, width: "90%", mx: "auto" }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid xs={7}>
                        <Typography level="h4" color="primary">{task.name}</Typography>
                        <Typography level="body-lg">{task.company}</Typography>
                        <Typography level="body-md" color="neutral">{task.location}</Typography>
                      </Grid>
                      <Grid xs={5} display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                        <Checkbox onChange={() => handleCheckboxChange(task)} />
                        <Chip startDecorator={task.icon} variant="outlined" size="lg">{task.type}</Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={1} sx={{ width: "100%" }}>
            <Typography level="h4">Today's Task</Typography>
            <Typography level="body-md" color="neutral">{getCurrentDate()}</Typography>
            {tasks.today.length > 0 ? (
              tasks.today.map((task, index) => (
                <Card key={index} sx={{ mb: 3, borderRadius: 6, boxShadow: "xl", border: "1px solid #bbb", p: 2, width: "90%", mx: "auto" }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid xs={7}>
                        <Typography level="h4" color="primary">{task.name}</Typography>
                        <Typography level="body-lg">{task.company}</Typography>
                        <Typography level="body-md" color="neutral">{task.location}</Typography>
                      </Grid>
                      <Grid xs={5} display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
                        <Checkbox onChange={() => handleCheckboxChange(task)} />
                        <Chip startDecorator={task.icon} variant="outlined" size="lg">By {task.type}</Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography level="body-lg">No tasks for today.</Typography>
            )}
          </TabPanel>
          <TabPanel value={2} sx={{ width: "100%" }}>
            <Typography level="body-lg">No future tasks available.</Typography>
          </TabPanel>
        </Tabs>
      </Sheet>
      <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <ModalDialog>
          <DialogTitle>Enter Comments</DialogTitle>
          <DialogContent>
            <Textarea minRows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your comments..." />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Submit</Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default TaskDashboard;
