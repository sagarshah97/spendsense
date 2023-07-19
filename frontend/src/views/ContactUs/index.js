import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      console.log("Form submitted:", { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
    } else {
      console.log("Validation error: Please fill in all fields.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="left" sx={{ mt: 4, mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" align="left" sx={{ mt: 4, mb: 3 }}>
        You can contact us by sending in your queries or report any issues by
        filling out the following details. We will contact you as soon as we
        receive your queries.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              fullWidth
              required
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUsPage;
