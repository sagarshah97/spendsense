import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExpenseReportPage = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [chosenMonth, setChosenMonth] = useState("");

  const handleMonthChange = (event) => {
    setChosenMonth(event.target.value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#expense-table",
    });
    doc.save("expense-report.pdf");
  };

  const generateExpenseReport = () => {
    // Generate the expense report data based on the chosen month
    const expenses = [
      { name: "Expense 1", date: "2022-10-01", amount: 100, category: "Food" },
      {
        name: "Expense 2",
        date: "2022-10-05",
        amount: 50,
        category: "Transportation",
      },
      {
        name: "Expense 3",
        date: "2022-10-15",
        amount: 80,
        category: "Shopping",
      },
      {
        name: "Expense 4",
        date: "2022-10-20",
        amount: 120,
        category: "Entertainment",
      },
    ];

    return expenses.map((expense, index) => (
      <TableRow
        key={index}
        sx={{
          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "inherit",
          overflowWrap: "anywhere",
        }}
      >
        <TableCell>{expense.name}</TableCell>
        <TableCell>{expense.date}</TableCell>
        <TableCell>{expense.amount}</TableCell>
        <TableCell>{expense.category}</TableCell>
      </TableRow>
    ));
  };

  return (
    <Box style={{ padding: "3%" }}>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6">Expense Report</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl fullWidth>
              <InputLabel id="month-label">Select Month</InputLabel>
              <Select
                labelId="month-label"
                label="Select Month"
                id="month-select"
                value={chosenMonth}
                onChange={handleMonthChange}
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {chosenMonth && (
              <div>
                <>
                  <Table
                    id="expense-table"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 700 }}>
                          Expense Name
                        </TableCell>
                        <TableCell style={{ fontWeight: 700 }}>Date</TableCell>
                        <TableCell style={{ fontWeight: 700 }}>
                          Amount
                        </TableCell>
                        <TableCell style={{ fontWeight: 700 }}>
                          Category
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{generateExpenseReport()}</TableBody>
                  </Table>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleExportPDF}
                    >
                      Export as PDF
                    </Button>
                  </div>
                </>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ExpenseReportPage;
