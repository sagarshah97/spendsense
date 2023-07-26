import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";

const MemberSearchModal = ({ open, handleClose, handleGroupSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const [selectedMember, setSelectedMember] = useState("");

  const [existingMembers, setExistingMembers] = useState([
    {
      name: "Pratik Parmar",
      email: "pratik@example.com",
    },
    {
      name: "Aayush Pandya",
      email: "aayush@example.com",
    },
    {
      name: "Nikhil Panikassery",
      email: "nikhil@example.com",
    },
    {
      name: "Siddhesh Salve",
      email: "siddhesh@example.com",
    },
    {
      name: "Raj Patel",
      email: "raj@example.com",
    },
    {
      name: "Harsh Vaghani",
      email: "harsh@example.com",
    },
  ]);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleMemberChange = (event) => {
    const { value } = event.target;
    setSelectedMember(value);
  };

  const handleAddMember = () => {
    if (selectedMember) {
      const existingMember = members.find(
        (member) => member.email === selectedMember
      );
      if (existingMember) {
        setError("Member already added");
        return;
      }

      setMembers([...members, { email: selectedMember }]);
      setMemberEmail("");
      setError("");
    }
  };

  const handleRemoveMember = (email) => {
    setMembers(members.filter((member) => member.email !== email));
  };

  const handleGroupSubmitClick = () => {
    // Verify if members exist in the system
    const nonExistingMembers = members.filter((member) => {
      // Simulated check if member exists in the system
      return !member.email.includes("@example.com"); //todo: make the api call to verify if these users exist in the database and return their names
    });

    if (nonExistingMembers.length > 0) {
      setError(
        `Members ${nonExistingMembers
          .map((member) => member.email)
          .join(", ")} do not exist`
      );
      return;
    }

    if (groupName && members.length > 0) {
      //todo: send their full names
      let addedMembers = [];
      members.forEach((obj) => {
        addedMembers.push(
          obj.email.split("@")[0].charAt(0).toUpperCase() +
            obj.email.split("@")[0].slice(1)
        );
      });
      handleGroupSubmit({ name: groupName, addedMembers });
      setGroupName("");
      setMembers([]);
      setError("");
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%", outline: "none" }}
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={6}
          lg={4}
          sx={{ bgcolor: "background.paper", p: 3, borderRadius: "8px" }}
        >
          <Typography variant="h6" gutterBottom>
            New Group
          </Typography>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <FormControl fullWidth style={{ marginTop: "5%" }}>
            <InputLabel id="group-label">Select a member</InputLabel>
            <Select
              labelId="group-label"
              id="group-select"
              label="Select a member"
              value={selectedMember}
              onChange={handleMemberChange}
            >
              {existingMembers.map((member) => (
                <MenuItem key={member.email} value={member.email}>
                  {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMember}
            sx={{ mt: 2 }}
            fullWidth
          >
            Add Member
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {members.length > 0 && (
            <Grid container spacing={1} sx={{ mt: 2 }}>
              {members.map((member, index) => (
                <Grid item key={index}>
                  <Chip
                    label={member.email}
                    onDelete={() => handleRemoveMember(member.email)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleGroupSubmitClick}
            disabled={!groupName || members.length === 0}
            sx={{ mt: 3 }}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default MemberSearchModal;
