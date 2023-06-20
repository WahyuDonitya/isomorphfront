import React from "react";
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#673AB7",
    },
  },
});

const DashboardAdmin = () => {
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardAdmin;
