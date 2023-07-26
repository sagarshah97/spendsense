import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setLoginError("Please enter a valid email");
      return;
    }

    const params = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/api/users/login", params)
      .then((response) => {
        console.log(response);
        const { userId } = response.data;
        setUserId(userId);
        console.log(userId);
        if (response.status === 200) {
          setLoginError("Login successful");
          setTimeout(() => {
            navigate("/homepage");
          }, 3000);
        } else {
          setLoginError("Invalid Credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError("Invalid Credentials. Please try again");
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
        <CssBaseline />
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
            LOGIN
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"} // Show password or hide it
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
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
                // Add the eye icon button to the password field
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      color="inherit"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#1976D2", color: "white" }}
            >
              Sign In
            </Button>
            {loginError && (
              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{ color: "black" }}
              >
                {loginError}
              </Typography>
            )}
            <Typography
              variant="body2"
              onClick={() => navigate("/passwordreset")}
              sx={{
                textDecoration: "none",
                color: "blue",
                cursor: "pointer",
                textAlign: "center",
                paddingTop: "2%",
              }}
            >
              Forgot Password
            </Typography>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "black" }}>Don't have an account? </span>
              <span
                variant="body2"
                onClick={() => navigate("/register")}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Sign Up
              </span>
            </div>
            <Typography
              sx={{
                marginTop: "80px",
                color: "blue",
                textAlign: "center",
              }}
            >
              {/* For now type any email and password and it will take you to the
              HomePage for the purpose of this proposal */}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
