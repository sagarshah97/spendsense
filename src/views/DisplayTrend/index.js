import { React, useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Box,
  Container,
} from "@mui/material";
import { Line, Bar, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import predictTotalExpense from "../../utils/ExpensePredictor";

const ExpenseGraph = () => {
  const month = "July";
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
  const monthlyExpenses = [
    {
      id: 1,
      date: "July 1, 2023",
      expense: 100,
    },
    {
      id: 2,
      date: "July 3, 2023",
      expense: 80,
    },
    {
      id: 3,
      date: "July 4, 2023",
      expense: 120,
    },
    {
      id: 4,
      date: "July 5, 2023",
      expense: 90,
    },
    {
      id: 5,
      date: "July 10, 2023",
      expense: 150,
    },
    {
      id: 6,
      date: "July 12, 2023",
      expense: 110,
    },
  ];
  const [selectedMonth, setSelectedMonth] = useState();
  const [chartType, setChartType] = useState("line");
  const [projectedExpense, setProjectedExpense] = useState(0);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [expenseData, setExpenseData] = useState({
    labels: monthlyExpenses.map((entry) => entry.date),
    datasets: [
      {
        label: "Expenses",
        data: monthlyExpenses.map((entry) => entry.expense),
        fill: true,
        backgroundColor: "rgba(204, 230, 255, 0.5)",
        borderColor: "rgba(23,117,209,1)",
      },
    ],
  });

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    //todo: Implement logic to fetch expense data for the selected month
    //todo: Update expenseData state with the fetched data
    console.log(event.target.value);
    if (event.target.value === month) {
      setIsDataAvailable(true);
    } else {
      setIsDataAvailable(false);
    }
  };

  const handleChartTypeToggle = () => {
    const newChartType = chartType === "line" ? "bar" : "line";
    setChartType(newChartType);
  };

  const calculateProjectedExpense = () => {
    const projectedExpense = predictTotalExpense(
      monthlyExpenses.map(({ id, expense }) => ({ day: id, expense }))
    );
    setProjectedExpense(projectedExpense);
  };

  const chartRef = useRef();

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        type: "linear",
      },
    },
  };

  useEffect(() => {
    if (Chart.registerables) {
      Chart.register(...Chart.registerables);
    }
    calculateProjectedExpense();
  }, [expenseData, selectedMonth]);

  useEffect(() => {
    calculateProjectedExpense();
  }, [expenseData, selectedMonth]);

  const chartComponent =
    chartType === "line" ? (
      <Line ref={chartRef} data={expenseData} options={options} />
    ) : (
      //   <Bar ref={chartRef} data={expenseData} options={options} />
      <Radar data={expenseData} />
    );

  return (
    <>
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
              <Typography variant="h6">Expense Trend</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="month-label">Select Month</InputLabel>
                <Select
                  labelId="month-label"
                  label="Select Month"
                  id="month-select"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <MenuItem value={month}>{month}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {isDataAvailable && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                container
                alignItems="center"
              >
                <Typography component="div" variant="body2">
                  Line Chart
                </Typography>
                <Switch
                  checked={chartType === "bar"}
                  onChange={handleChartTypeToggle}
                />
                <Typography component="div" variant="body2">
                  Radar Chart
                </Typography>
              </Grid>
            )}
            {isDataAvailable && chartComponent}
            {isDataAvailable && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    paddingTop: "3%",
                  }}
                >
                  Projected Expense
                </Typography>
                <Typography
                  style={{
                    paddingTop: "2%",
                  }}
                >
                  Based on your daily expenditure, the predicted expense for
                  this month would be around
                  <strong> ${projectedExpense.toFixed(2)}</strong>
                </Typography>
              </Grid>
            )}
            {!isDataAvailable && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "200",
                      padding: "3%",
                      textAlign: "center",
                    }}
                  >
                    No data available
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ExpenseGraph;
