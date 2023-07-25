import React from "react";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "../assets/logoWhite.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <footer
      style={{ backgroundColor: "#262626", color: "white", padding: "30px 0" }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} align="center">
            <img src={Logo} alt="Logo" style={{ height: 30, width: "auto" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body2" align="center">
              <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                Home
              </span>
              <span
                style={{
                  paddingLeft: "2%",
                  paddingRight: "2%",
                }}
              >
                |
              </span>
              <span
                onClick={() => navigate("/contact")}
                style={{
                  cursor: "pointer",
                }}
              >
                Contact
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body2" align="center">
              &copy; {new Date().getFullYear()} Spendsense. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
