import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/AddTransaction.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  styled,
  Grid,
  Container,
} from "@mui/material";
import axios from "axios";
import ExpenseSplitter from "../ExpenseSplitter/index";
import MemberSearchModal from "../NewGroupModal/index";

const ExpensePage = ({ handleExpenseSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleExpenseSubmit({ amount, category, note, date });
    axios
      .post("http://localhost:8080/api/personalTransaction/add", {
        date,
        amount,
        category,
        note,
        typeOfTransaction: "Expense", // Set the type of transaction
      })
      .then((response) => {
        console.log("Expense transaction added:", response.data);
        // Handle any success actions or feedback here
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions or feedback here
      });
    setAmount(0);
    setCategory("");
    setNote("");
    setDate("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="page-container">
      <h1 style={{ overflowWrap: "anywhere" }}>Expense</h1>

      <Slider {...settings}>
        <div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  {/* <InputLabel htmlFor="date">Date</InputLabel> */}
                  <TextField
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  {/* <InputLabel htmlFor="amount">Amount</InputLabel> */}
                  <TextField
                    type="number"
                    label="Amount"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    id="category"
                    label="Category"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="Grocery">Grocery</MenuItem>
                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                    <MenuItem value="Rent">Rent</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="note">Note</InputLabel>
                  <TextField
                    id="note"
                    value={note}
                    onChange={handleNoteChange}
                    multiline
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Slider>
    </div>
  );
};

const IncomePage = ({ handleIncomeSubmit }) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleIncomeSubmit({ amount, category, note, date });
    axios
      .post("http://localhost:8080/api/personalTransaction/add", {
        date,
        amount,
        category,
        note,
        typeOfTransaction: "Income", // Set the type of transaction
      })
      .then((response) => {
        console.log("Income transaction added:", response.data);
        // Handle any success actions or feedback here
      })
      .catch((error) => {
        console.error(error);
        // Handle any error actions or feedback here
      });
    setAmount(0);
    setCategory("");
    setNote("");
    setDate("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="page-container">
      <h1 style={{ overflowWrap: "anywhere" }}>Income</h1>

      <Slider {...settings}>
        <div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  {/* <InputLabel htmlFor="date">Date</InputLabel> */}
                  <TextField
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  {/* <InputLabel htmlFor="amount">Amount</InputLabel> */}
                  <TextField
                    type="number"
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">Select a category</MenuItem>
                    <MenuItem value="Salary">Salary</MenuItem>
                    <MenuItem value="Freelance">Freelance</MenuItem>
                    <MenuItem value="Investments">Investments</MenuItem>
                    <MenuItem value="Gift">Gift</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="note">Note</InputLabel>
                  <TextField
                    id="note"
                    value={note}
                    onChange={handleNoteChange}
                    multiline
                    rows={4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Slider>
    </div>
  );
};

const GroupExpensePage = ({ handleExpenseSubmit }) => {
  const currentUser = "John Wick";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group A",
      members: ["John Wick", "Jake Peralta", "Alice Smith", "Kate Winslet"],
    },
    {
      id: 2,
      name: "Group B",
      members: [
        "John Wick",
        "Bob Murray",
        "Charlie Chaplin",
        "Evangeline Lily",
      ],
    },
    {
      id: 3,
      name: "Group C",
      members: ["Mike Ross", "John Wick", "Sarah Connor", "Tom Felton"],
    },
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGroupSubmit = (groupDetails) => {
    console.log(groupDetails);
    const newGroup = {
      id: groups[groups.length - 1].id + 1,
      name: groupDetails.name,
      members: groupDetails.addedMembers.concat(currentUser),
    };

    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="page-container">
        <h1 style={{ overflowWrap: "anywhere" }}>Shared Expense</h1>

        <Slider {...settings}>
          <div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ExpenseSplitter
                    groups={groups}
                    handleOpenModal={handleOpenModal}
                  />
                  <MemberSearchModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    handleGroupSubmit={handleGroupSubmit}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Slider>
      </div>
    </>
  );
};

const AddTransaction = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleIncomeSubmit = (income) => {
    setIncomes([...incomes, income]);
  };

  const handleGroupExpenseSubmit = (expense) => {
    console.log(expense);
  };

  return (
    <div className="tracker-container">
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Add Expense" {...a11yProps(0)} />
                <Tab label="Add Income" {...a11yProps(1)} />
                <Tab label="Add Group Expense" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <ExpensePage handleExpenseSubmit={handleExpenseSubmit} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <IncomePage handleIncomeSubmit={handleIncomeSubmit} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
              <GroupExpensePage
                handleGroupExpenseSubmit={handleGroupExpenseSubmit}
              />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTransaction;
