import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "../../utils/validations/auth/loginValidations";
import { useMutation } from "react-query";
import { login } from "../../api/authApi";
import { Alert, LinearProgress } from "@mui/material";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../features/auth/authSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const pengguna = auth.pengguna;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: "",
      password: "",
    },
    resolver: joiResolver(schema),
  });

  const mutation = useMutation(async (data) => {
    const response = await login(data);
    const token = response.data.access_token;
    const decoded = jwtDecode(token);
    dispatch(
      authSliceActions.setCredentials({
        pengguna: decoded.pengguna,
        access_token: token,
      })
    );
  });

  const handleLogin = (data) => {
    mutation.mutate(data);
  };

  let content;
  if (mutation.isLoading) {
    content = <LinearProgress color="secondary" />;
  } else if (mutation.isError) {
    content = (
      <Alert severity="error">
        {/* {mutation.error.message} */}
        {mutation.error.response}
      </Alert>
    );
  } else if (mutation.isSuccess) {
    content = (
      <Alert severity="success">
        Login berhasil, sedang redirecting ke halaman home ...
      </Alert>
    );

    if(pengguna.roles[0] == "admin"){
      return <Navigate to="/admin/dashboard" />;
    }else if (pengguna.roles[0] == "visitor"){
      return <Navigate to="/dashboard" />;
    }
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4b894bad-293d-4ccf-8dd4-9d6f213f80ce/d5vszt4-753173cb-2782-48e5-911c-39c41a3488ae.jpg/v1/fill/w_1024,h_576,q_75,strp/dota_2_logo_minimal_white_wallpaper_by_noblepress_d5vszt4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvNGI4OTRiYWQtMjkzZC00Y2NmLThkZDQtOWQ2ZjIxM2Y4MGNlXC9kNXZzenQ0LTc1MzE3M2NiLTI3ODItNDhlNS05MTFjLTM5YzQxYTM0ODhhZS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.hsGXBDNG7zh-cTFqOYCFKIOqe4vg57l8SjOSk0Fec_0)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Controller
                name="nama"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Username"
                    variant="outlined"
                    sx={{ my: 3 }}
                    fullWidth
                    helperText={
                      errors["nama"]
                        ? errors["nama"].message
                        : "Masukkan Nama Anda"
                    }
                    error={errors["nama"] !== undefined}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Password"
                    variant="outlined"
                    sx={{ my: 3 }}
                    fullWidth
                    helperText={
                      errors["password"]
                        ? errors["password"].message
                        : "Masukkan password Anda"
                    }
                    error={errors["password"] !== undefined}
                    {...field}
                  />
                )}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit((data) => {
                  handleLogin(data);
                })}
              >
                Sign In
              </Button>
              <Grid item xs={12}>
                {content}
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
