import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema } from "../../utils/validations/auth/registerValidation";
import {
  Alert,
  FormHelperText,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { useMutation } from "react-query";
import { register } from "../../api/authApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nama: "",
      password: "aA1!",
      password_confirmation: "aA1!",
      jk: "wanita",
    },
    resolver: joiResolver(schema),
  });

  const mutation = useMutation((data) => {
    return register(data);
  });

  const handleRegister = (data) => {
    mutation.mutate(data);
  };

  let content;
  if (mutation.isLoading) {
    content = <LinearProgress color="secondary" />;
  } else if (mutation.isError) {
    content = (
      <Alert severity="error">
        {/* {mutation.error.message} */}
        {mutation.error.response.data.msg}
      </Alert>
    );
  } else if (mutation.isSuccess) {
    content = (
      <Alert severity="success">
        Registrasi berhasil, silakan login di
        <Link to="/login">sini</Link>
      </Alert>
    );
  }

  useEffect(() => {
    reset({
      nama: "",
      password: "aA1!",
      password_confirmation: "aA1!",
      jk: "wanita",
    });
  }, [mutation.isSuccess]);

  const jkOpts = ["pria", "wanita"];
  const jkRender = jkOpts.map((item) => {
    return (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    );
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Username"
                      variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password_confirmation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Konfirmasi Password"
                      variant="outlined"
                      fullWidth
                      helperText={
                        errors["password_confirmation"]
                          ? errors["password_confirmation"].message
                          : "Masukkan konfirmasi password Anda"
                      }
                      error={errors["password_confirmation"] !== undefined}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Jenis Kelamin</label>
                <Controller
                  name="jk"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        error={errors["jk"] !== undefined}
                        sx={{ mx: 3 }}
                        {...field}
                      >
                        {jkRender}
                      </Select>
                      <FormHelperText error={errors["jk"] !== undefined}>
                        {errors["jk"]
                          ? errors["jk"].message
                          : "Masukkan jenis kelamin Anda"}
                      </FormHelperText>
                    </>
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit((data) => {
                handleRegister(data);
              })}
            >
              Sign Up
            </Button>

            <Grid item xs={12}>
              {content}
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
