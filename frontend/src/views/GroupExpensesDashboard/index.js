// Import necessary modules
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Sample data for demonstration purposes
const expensesData = {
  whatIOwe: [
    { name: "John", amount: 20, group: "xyz" },
    { name: "Sarah", amount: 10, group: "xyz" },
    { name: "John", amount: 20, group: "xyz" },
    { name: "Sarah", amount: 10, group: "xyz" },
  ],
  whatImOwed: [
    { name: "Mike", amount: 15, group: "xyz" },
    { name: "Emma", amount: 30, group: "xyz" },
    { name: "Mike", amount: 15, group: "xyz" },
    { name: "Emma", amount: 30, group: "xyz" },
  ],
};

// GroupExpenseDashboard component
const GroupExpenseDashboard = () => {
  // Calculate total amounts owed and what you are owed
  const totalOwe = expensesData.whatIOwe.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const totalOwed = expensesData.whatImOwed.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleSettleUp = (entry) => {
    // Replace this alert with your actual settlement logic
    alert(
      `Settling up with ${entry.name} for $${entry.amount} in group ${entry.group}`
    );
  };

  return (
    <div style={{ maxWidth: "75%", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Group Expenses Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ paddingBottom: 2 }}>
                What I Owe - Total:{" "}
                <span style={{ color: "red" }}>${totalOwe}</span>
              </Typography>
              {expensesData.whatIOwe.length === 0 ? (
                <Typography
                  variant="body1"
                  style={{ marginTop: "10px" }}
                  align="center"
                >
                  No records found.
                </Typography>
              ) : (
                expensesData.whatIOwe.map((expense, index) => (
                  <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">
                        I owe {expense.name}{" "}
                        <span style={{ color: "red" }}>${expense.amount}</span>{" "}
                        in group {expense.group}
                      </Typography>
                      <Button
                        onClick={() => handleSettleUp(expense)}
                        variant="contained"
                        color="primary"
                        endIcon={<MonetizationOnIcon />}
                        size="small"
                      >
                        Settle Up
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" sx={{ paddingBottom: 2 }}>
                What I'm Owed - Total:{" "}
                <span style={{ color: "green" }}>${totalOwed}</span>
              </Typography>
              {expensesData.whatImOwed.length === 0 ? (
                <Typography
                  variant="body1"
                  style={{ marginTop: "10px" }}
                  align="center"
                >
                  No records found.
                </Typography>
              ) : (
                expensesData.whatImOwed.map((expense, index) => (
                  <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {expense.name} owes me{" "}
                        <span style={{ color: "green" }}>
                          ${expense.amount}
                        </span>{" "}
                        in group {expense.group}
                      </Typography>
                      <Button
                        onClick={() => handleSettleUp(expense)}
                        variant="contained"
                        color="primary"
                        endIcon={<MonetizationOnIcon />}
                        size="small"
                      >
                        Settle Up
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default GroupExpenseDashboard;
