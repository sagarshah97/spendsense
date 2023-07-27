import React, { useState, useEffect } from "react";
import {
  Avatar,
  CardHeader,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function UserProfile() {
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

  // const jsonData = {
  //   _id: {
  //     $oid: "64bf4c863528564d5a7aa3b3",
  //   },
  //   username: "john_doe",
  //   email: "john.doe@example.com",
  //   name: "John Doe",
  //   age: 30,
  //   friends: [
  //     {
  //       name: "jane smith",
  //       email: "jane.smith@example.com",
  //     },
  //     {
  //       name: "Michael ross",
  //       email: "michael_ross@example.com",
  //     },
  //     {
  //       name: "Michael ross",
  //       email: "michael_ross@example.com",
  //     },
  //     {
  //       name: "jane smith",
  //       email: "jane.smith@example.com",
  //     },
  //     {
  //       name: "Michael ross",
  //       email: "michael_ross@example.com",
  //     },
  //     {
  //       name: "Michael ross",
  //       email: "michael_ross@example.com",
  //     },
  //   ],
  // };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = "64c0c0af63cc30d64079845d";
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4} style={{ paddingTop: 0 }}>
          <Card>
            <CardMedia
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "2%",
              }}
            >
              <Avatar sx={{ height: 200, width: 200 }}>
                console.log(userData)
                {stringAvatar(userData.firstname)}
                style={{ color: "white" }}
              </Avatar>
            </CardMedia>

            <CardContent>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Welcome {userData.firstname}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Name: ${userData.firstname}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Name: ${userData.lastname}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Email: ${userData.email}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Age: ${userData.age}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#eeeeee",
            padding: "3%",
          }}
        >
          <div
            style={{
              fontWeight: 100,
              fontSize: "1.5rem",
            }}
          >
            Your Friends
          </div>
          <div
            className="user-cards"
            style={{
              textAlign: "center",
              marginTop: "20px",
              alignItems: "center",
              overflowY: "auto",
              maxHeight: "500px",
              width: "100%",
              overflowWrap: "anywhere",
            }}
          >
            <Grid container spacing={2}>
              {userData.friends.map((user, index) => (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card key={index} sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{}} aria-label="recipe">
                            UN
                          </Avatar>
                        }
                        title={user.firstname}
                        subheader={user.email}
                      />
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile;
