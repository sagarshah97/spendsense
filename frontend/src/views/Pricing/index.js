// PricingPage.js
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import styles from "./styles.css"; // Import the CSS file

const PricingPage = () => {
  return (
    <div className="pricing-container">
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
    </div>
  );
};

export default PricingPage;
