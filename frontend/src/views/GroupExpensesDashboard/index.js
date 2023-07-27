import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Tooltip, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const GroupExpenseDashboard = () => {
  const [expensesData, setExpensesData] = useState(null);
  const [totalOwe, setTotalOwe] = useState(null);
  const [totalOwed, setTotalOwed] = useState(null);

  const userId = sessionStorage.getItem("userId");

  const handleSettleUp = (entry) => {
    alert(
      `Settling up with ${entry.name} for $${entry.amount} in group ${entry.group}`
    );
  };

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(`/userAmountData/${userId}`);
      setExpensesData(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    if (expensesData) {
      const totalOweTemp = expensesData.whatIOwe.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      const totalOwedTemp = expensesData.whatImOwed.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      setTotalOwe(totalOweTemp);
      setTotalOwed(totalOwedTemp);
    }
  }, [expensesData]);

  useEffect(() => {
    fetchExpenseData();
  }, []);
  return (
    <div style={{ maxWidth: "75%", margin: "0 auto", paddingBottom: "15px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Group Expenses Dashboard
      </Typography>
      {expensesData && (
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
                    <Grid container spacing={2}>
                      {expensesData.whatImOwed.map((expense, index) => (
                        <>
                          <Grid item xs={9}>
                            <Typography variant="body1">
                              I owe {expense.name}{" "}
                              <span style={{ color: "red" }}>
                                ${expense.amount}
                              </span>{" "}
                              in group {expense.group} for {expense.description}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Button
                              onClick={() => handleSettleUp(expense)}
                              variant="contained"
                              color="primary"
                              endIcon={<MonetizationOnIcon />}
                              size="small"
                            >
                              Settle
                            </Button>
                          </Grid>
                        </>
                      ))}
                    </Grid>
                    // <Card
                    //   key={index}
                    //   variant="outlined"
                    //   sx={{ marginBottom: 2 }}
                    // >
                    //   <CardContent
                    //     sx={{
                    //       display: "flex",
                    //       justifyContent: "space-between",
                    //       alignItems: "center",
                    //     }}
                    //   >
                    //     <Typography variant="body1">
                    //       I owe {expense.name}{" "}
                    //       <span style={{ color: "red" }}>
                    //         ${expense.amount}
                    //       </span>{" "}
                    //       in group {expense.group} for {expense.description}
                    //     </Typography>

                    //     <Tooltip title="Settle Up">
                    //       <IconButton
                    //         onClick={() => handleSettleUp(expense)}
                    //         color="primary"
                    //         size="small"
                    //       >
                    //         <MonetizationOnIcon />
                    //       </IconButton>
                    //     </Tooltip>
                    //   </CardContent>
                    // </Card>
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
                  <Grid container spacing={2}>
                    {expensesData.whatImOwed.map((expense, index) => (
                      <>
                        <Grid item xs={9}>
                          <Typography variant="body1">
                            {expense.name} owes me{" "}
                            <span style={{ color: "green" }}>
                              ${expense.amount}
                            </span>{" "}
                            in group {expense.group} for {expense.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            onClick={() => handleSettleUp(expense)}
                            variant="contained"
                            color="primary"
                            endIcon={<MonetizationOnIcon />}
                            size="small"
                          >
                            Settle
                          </Button>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default GroupExpenseDashboard;
