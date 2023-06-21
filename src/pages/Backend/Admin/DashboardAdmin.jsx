import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { NotificationImportant, Title } from "@mui/icons-material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7",
    },
  },
});



const DashboardAdmin = () => {
  const [report, setreport] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        // https://api.opendota.com/api/heroes
        const response = await axios.get("http://localhost:3000/api/v1/team/getReport");
        console.log(response.data.data);
        setreport(response.data.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Total Teams */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: "#F9A825",
                }}
              >
                <Typography variant="h6" color="white">
                  Grid Total Teams
                </Typography>

                <Typography variant="h5" color="white">
                  {report.countApproval}
                </Typography>
              </Paper>
            </Grid>
            {/* Total Teams to Approve */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: "#F44336",
                }}
              >
                <Typography variant="h6" color="white">
                  Grid Total Teams to Approve
                </Typography>

                <Typography variant="h5" color="white">
                  {report.needApproval}
                </Typography>
              </Paper>
            </Grid>
            {/* Total Approved Teams */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: "#4CAF50",
                }}
              >
                <Typography variant="h6" color="white">
                  Grid Total Approved Teams
                </Typography>

                <Typography variant="h5" color="white">
                  {report.allApproved}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                  backgroundColor: "#F44336",
                }}
              >
                <Typography variant="h6" color="white">
                  Grid Total rejected
                </Typography>

                <Typography variant="h5" color="white">
                  {report.allRejected}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardAdmin;
