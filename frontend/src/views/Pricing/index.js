// PricingPage.js
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import styles from "./styles.css"; // Import the CSS file
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Paper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
const PricingPage = () => {
  const [yearly, setYearly] = useState(false);
  const yearlyValue = "107.99";
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5">SPENDSENSE</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">Pricing Options</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h6">
            Switch to a commercial plan to access advanced features & technical
            support.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          Monthly
          <Switch
            onChange={() => {
              setYearly(!yearly);
            }}
          />
          Yearly{" "}
          {/* <Typography
            variant="h6"
            style={{ display: "inline-block", color: "#999999" }}
          >
            (10% off)
          </Typography> */}
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Card className="card" sx={{ padding: "20px 0" }}>
            <Typography variant="h6">Community</Typography>
            <Typography variant="h3" style={{ display: "inline-block" }}>
              Free
            </Typography>{" "}
            {/* <Typography
              variant="h5"
              style={{
                display: "inline-block",
                textDecoration: "line-through",
              }}
            >
              {" "}
              {yearly ? "/ year" : "/ month"}
            </Typography> */}
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 1
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 2
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 3
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 4
            </Typography>
            <Typography
              variant="h6"
              sx={{ textDecoration: "line-through", color: "#999999" }}
            >
              <CloseIcon color="secondary" />
              Feature 5
            </Typography>
            <Typography
              variant="h6"
              sx={{ textDecoration: "line-through", color: "#999999" }}
            >
              <CloseIcon color="secondary" />
              Feature 6
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "center" }}>
          <Card className="card" sx={{ padding: "20px 0" }}>
            <Typography variant="h6">Pro</Typography>
            <Typography variant="h3" style={{ display: "inline-block" }}>
              {yearly ? "$107.99" : "$9.99"}
            </Typography>{" "}
            <Typography variant="h5" style={{ display: "inline-block" }}>
              {" "}
              {yearly ? "/ year" : "/ month"}
            </Typography>
            {yearly && (
              <Typography
                variant="h6"
                style={{ display: "inline-block", color: "#999999" }}
              >
                (10% off)
              </Typography>
            )}
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 1
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 2
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 3
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 4
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 6
            </Typography>
            <Typography variant="h6">
              <DoneIcon color="primary" />
              Feature 6
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
      </Grid>
      {/* <div className="pricing-container">
      <Typography variant="h4" align="center" gutterBottom>
        Pricing Options
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card className={`card plan plan-silver`}>
            <CardContent>
              <Typography variant="h5" className="icon">
                <StarIcon />
              </Typography>
              <Typography variant="h6" className="title">
                Silver Plan
              </Typography>
              <Typography variant="h4" className="price">
                $9.99/month
              </Typography>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 1
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 2
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 3
                </Typography>
              </div>
              <Button variant="contained" className="button">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={`card plan plan-gold`}>
            <CardContent>
              <Typography variant="h5" className="icon">
                <StarIcon />
              </Typography>
              <Typography variant="h6" className="title">
                Gold Plan
              </Typography>
              <Typography variant="h4" className="price">
                $19.99/month
              </Typography>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 1
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 2
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 3
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 4
                </Typography>
              </div>
              <Button variant="contained" className="button">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className={`card plan plan-platinum`}>
            <CardContent>
              <Typography variant="h5" className="icon">
                <StarIcon />
              </Typography>
              <Typography variant="h6" className="title">
                Platinum Plan
              </Typography>
              <Typography variant="h4" className="price">
                $29.99/month
              </Typography>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 1
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 2
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 3
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 4
                </Typography>
              </div>
              <div className="feature">
                <CheckIcon />
                <Typography variant="body1" className="featureText">
                  Feature 5
                </Typography>
              </div>
              <Button variant="contained" className="button">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>*/}
    </>
  );
};

export default PricingPage;
