import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

// Dummy data for demonstration purposes
const dummyGroupData = [
  {
    id: "group1",
    name: "Group A",
    members: ["John", "Sarah", "Mike"],
  },
  {
    id: "group2",
    name: "Group B",
    members: ["Emma", "Jack", "Sophia"],
  },
];

const dummyGroupHistory = [
  {
    id: 1,
    groupId: "group1",
    timestamp: "2023-07-25 10:30 AM",
    description: "Shared lunch expenses",
    paidBy: "John",
    memberDivision: [33.333, 33.333, 33.333], // Division of expenses among members
  },
  {
    id: 2,
    groupId: "group1",
    timestamp: "2023-07-26 04:15 PM",
    description: "Movie tickets",
    paidBy: "Sarah",
    memberDivision: [100, 0, 0], // Division of expenses among members
  },
  {
    id: 3,
    groupId: "group2",
    timestamp: "2023-07-27 02:00 PM",
    description: "Grocery shopping",
    paidBy: "Emma",
    memberDivision: [30, 70, 0], // Division of expenses among members
  },
];

const GroupHistory = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupHistory, setGroupHistory] = useState([]);

  useEffect(() => {
    // Fetch the group history for the selected group
    const fetchGroupHistory = () => {
      const historyForSelectedGroup = dummyGroupHistory.filter(
        (entry) => entry.groupId === selectedGroup
      );
      setGroupHistory(historyForSelectedGroup);
    };

    fetchGroupHistory();
  }, [selectedGroup]);

  const handleGroupSelect = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div style={{ maxWidth: "75%", margin: "0 auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Group History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select Group</InputLabel>
            <Select
              value={selectedGroup}
              onChange={handleGroupSelect}
              label="Select Group"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {dummyGroupData.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {groupHistory.length === 0 ? (
            <Card variant="outlined" sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="body1" align="center">
                  No history found for this group.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {groupHistory.map((entry) => (
                <Grid item key={entry.id} xs={12} sm={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Transaction Date:</strong>{" "}
                            {new Date(entry.timestamp).toLocaleString()}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Paid by:</strong> {entry.paidBy}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Description:</strong> {entry.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Total Amount:</strong>{" "}
                            {entry.memberDivision.reduce(
                              (acc, val) => acc + val,
                              0
                            )}
                          </Typography>
                          {dummyGroupData
                            .find((group) => group.id === selectedGroup)
                            .members.map((member, index) => (
                              <div key={index}>
                                <Typography variant="body2">
                                  {member} - {entry.memberDivision[index]}
                                  {/* {(
                                    (entry.memberDivision[index] /
                                      entry.memberDivision.reduce(
                                        (acc, val) => acc + val,
                                        0
                                      )) *
                                    100
                                  ).toFixed(2)} */}
                                  %
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  // value={
                                  //   (entry.memberDivision[index] /
                                  //     entry.memberDivision.reduce(
                                  //       (acc, val) => acc + val,
                                  //       0
                                  //     )) *
                                  //   100
                                  // }
                                  value={entry.memberDivision[index]}
                                  sx={{ height: 8, borderRadius: 5 }}
                                />
                                {/* <Typography variant="body2">
                                  {(
                                    (entry.memberDivision[index] /
                                      entry.memberDivision.reduce(
                                        (acc, val) => acc + val,
                                        0
                                      )) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </Typography> */}
                              </div>
                            ))}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default GroupHistory;
