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
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Expense Report
      </Typography>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <FormControl style={{ width: "10rem" }}>
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
      </div>
      {chosenMonth && (
        <div>
          <>
            <Table id="expense-table" style={{ overflowWrap: "anywhere" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 700 }}>
                    Expense Name
                  </TableCell>
                  <TableCell style={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell style={{ fontWeight: 700 }}>Amount</TableCell>
                  <TableCell style={{ fontWeight: 700 }}>Category</TableCell>
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
    </Container>
  );
};

export default ExpenseReportPage;
