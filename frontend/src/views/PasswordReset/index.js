import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setResetError("Please enter a valid email.");
      return;
    }

    // Send a request to your backend to handle password reset
    axios
      .post("http://localhost:8080/api/users/reset-password", { email })
      .then((response) => {
        // Handle success (e.g., show success message)
        setResetError("");
        setResetSuccess(true);
      })
      .catch((error) => {
        // Handle error (e.g., show error message)
        setResetSuccess(false);
        setResetError("Password reset failed. Please try again.");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{
            backgroundColor: "white",
            boxShadow: "none",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{
              color: "black",
              fontSize: "1.5rem",
              fontWeight: 100,
              letterSpacing: "0.3rem",
              marginBottom: "20px",
            }}
          >
            Forgot Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleResetPassword}
            sx={{ mt: 1, boxShadow: "none" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                style: {
                  color: "black",
                },
                sx: {
                  "& fieldset": {
                    border: "1px solid grey!important",
                    borderRadius: 1.5,
                  },
                  "&:hover fieldset": {
                    border: "1px solid black!important",
                    borderRadius: 1.5,
                  },
                  "&:focus-within fieldset, &:focus-visible fieldset": {
                    border: "1px solid blue!important",
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  color: "white",
                },
              }}
            />
            {resetError && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ color: "red" }}
              >
                {resetError}
              </Typography>
            )}
            {resetSuccess && (
              <Typography
                variant="body2"
                color="success"
                align="center"
                sx={{ color: "black" }}
              >
                Password reset link sent successfully.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#1976D2", color: "white" }}
            >
              Send Reset Link
            </Button>
            <Typography
              variant="body2"
              onClick={() => navigate("/")} // Redirect back to the login page
              sx={{
                textDecoration: "none",
                color: "blue",
                cursor: "pointer",
                textAlign: "center",
                paddingTop: "2%",
              }}
            >
              Go back to Login
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
