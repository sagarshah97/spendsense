import { React, useState } from "react";
import MemberSearchModal from "../NewGroupModal/index";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Container,
  Chip,
  Avatar,
} from "@mui/material";

const ExpenseSplitter = ({ groups, handleOpenModal }) => {
  console.log(groups);
  const currentUser = "John Wick";
  const [selectedGroup, setSelectedGroup] = useState("");
  const [splitOption, setSplitOption] = useState("equal");
  const [proportions, setProportions] = useState({});
  const [splitAmounts, setSplitAmounts] = useState([]);
  const [proportionError, setProportionError] = useState(false);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setSplitAmounts([]);
  };

  const handleSplitOptionChange = (event) => {
    setSplitOption(event.target.value);
    setProportions({});
    setSplitAmounts([]);
  };

  const handleProportionChange = (event, member) => {
    const { value } = event.target;
    setProportions((prevProportions) => ({
      ...prevProportions,
      [member]: value !== "" ? parseFloat(value) : 0,
    }));
  };

  const handleCreateGroup = () => {
    handleOpenModal();
  };

  const handleSplit = () => {
    const totalExpense = 100; //todo: Total expense amount
    const group = groups.find((grp) => grp.id === selectedGroup);
    if (!group) return;

    if (splitOption === "percentage") {
      let totalProportion = 0;
      Object.values(proportions).forEach((value) => {
        totalProportion += value;
      });

      if (totalProportion !== 100) {
        setProportionError(true);
        console.log("Total proportion should be 100%");
        return;
      } else {
        setProportionError(false);

        const splitAmounts = group.members.map((member) => {
          const proportion = proportions[member];
          const amount = (proportion / 100) * totalExpense;
          return { member, amount };
        });

        setSplitAmounts(splitAmounts);
      }
    } else {
      const splitAmounts = group.members.map((member) => {
        const proportion = 100 / group.members.length;
        const amount = (proportion / 100) * totalExpense;
        return { member, amount };
      });

      setSplitAmounts(splitAmounts);
    }
  };

  const getNameInitials = (name) => {
    const names = name.split(" ");

    if (names.length === 1) {
      return names[0].charAt(0);
    } else if (names.length > 1) {
      const firstNameInitial = names[0].charAt(0);
      const lastNameInitial = names[names.length - 1].charAt(0);
      return `${firstNameInitial}${lastNameInitial}`;
    }

    return "";
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: getNameInitials(name),
    };
  };

  const renderMembers = () => {
    const group = groups.find((grp) => grp.id === selectedGroup);
    if (!group) return null;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Members:</Typography>
        </Grid>
        {group.members.map((member) => (
          <Grid key={member} item>
            {/* {member} */}
            <Chip
              avatar={
                <Avatar
                  {...stringAvatar(member)}
                  style={{ color: "white" }}
                ></Avatar>
              }
              label={currentUser === member ? member + " (You)" : member}
              size="large"
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSplitOption = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Split Option:</Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <FormControl fullWidth>
            <InputLabel id="split-option-label">Split Option</InputLabel>
            <Select
              labelId="split-option-label"
              id="split-option-select"
              value={splitOption}
              onChange={handleSplitOptionChange}
              label="Split Option"
            >
              <MenuItem value="equal">Equally</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Button
            variant="contained"
            onClick={handleSplit}
            fullWidth
            style={{ height: "56px" }}
          >
            Split Expense
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderProportions = () => {
    if (splitOption === "percentage") {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Proportions:</Typography>
          </Grid>
          {groups.map((group) => {
            if (group.id === selectedGroup) {
              return group.members.map((member) => (
                <Grid key={member} item xs={12} sm={6}>
                  <TextField
                    label={member}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={proportions[member] || ""}
                    onChange={(event) => handleProportionChange(event, member)}
                    fullWidth
                  />
                </Grid>
              ));
            }
            return null;
          })}
          {proportionError && (
            <>
              <Grid item xs={12}>
                <span style={{ fontStyle: "italic", color: "red" }}>
                  Total proportion should be 100%
                </span>
              </Grid>
            </>
          )}
        </Grid>
      );
    }
    return null;
  };

  const renderSplitAmounts = () => {
    if (splitAmounts.length === 0) return null;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Split Amounts:</Typography>
        </Grid>
        {splitAmounts.map(({ member, amount }) => (
          <Grid key={member} item xs={12} sm={6}>
            {`${currentUser === member ? member + " (You)" : member} : `}
            <strong>${amount.toFixed(2)}</strong>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Box style={{ paddingTop: "3%" }}>
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <FormControl fullWidth>
                <InputLabel id="group-label">Select a Group</InputLabel>
                <Select
                  labelId="group-label"
                  id="group-select"
                  label="Select a Group"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Button
                variant="outlined"
                onClick={handleCreateGroup}
                fullWidth
                style={{ height: "56px" }}
              >
                Create New Group
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {selectedGroup && (
        <>
          <Box style={{ paddingTop: "3%" }}>
            <Container
              maxWidth="md"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  {renderMembers()}
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                  style={{ paddingTop: "5%" }}
                >
                  {renderSplitOption()}
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                  style={{ paddingTop: "2%" }}
                >
                  {renderProportions()}
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box style={{ paddingTop: "3%" }}>
            <Container
              maxWidth="md"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} md={12} sm={12}>
                  {renderSplitAmounts()}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default ExpenseSplitter;
