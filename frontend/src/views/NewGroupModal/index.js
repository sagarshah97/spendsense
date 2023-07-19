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
  const [emailError, setEmailError] = useState("");

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleMemberEmailChange = (event) => {
    const { value } = event.target;
    setMemberEmail(value);

    if (value) {
      const isValidEmail = validateEmail(value);
      if (!isValidEmail) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handleAddMember = () => {
    if (memberEmail) {
      const existingMember = members.find(
        (member) => member.email === memberEmail
      );
      if (existingMember) {
        setError("Member already added");
        return;
      }

      setMembers([...members, { email: memberEmail }]);
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
          <TextField
            label="Member Email"
            variant="outlined"
            fullWidth
            value={memberEmail}
            onChange={handleMemberEmailChange}
            sx={{ mt: 2 }}
          />
          {emailError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {emailError}
            </Typography>
          )}
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
