import { React, useState } from "react";
import { Grid, Container, Button } from "@mui/material";
import ExpenseSplitter from "../ExpenseSplitter/index";
import MemberSearchModal from "../NewGroupModal/index";
import ExpenseGraph from "../DisplayTrend/index";
import FAQ from "../FAQ/index";
import ContactUsPage from "../ContactUs";

const App = () => {
  const currentUser = "John Wick";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpSplitterOpen, setIsExpSplitterOpen] = useState(false);
  const [viewTrends, setViewTrends] = useState(false);
  const [contactUs, setContactUs] = useState(false);
  const [faq, setFaq] = useState(false);

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

  return (
    <div>
      {!isExpSplitterOpen && !viewTrends && !contactUs && !faq && (
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <Grid container spacing={2}>
            <div
              style={{ color: "red", paddingTop: "10%", textAlign: "center" }}
            >
              Note: If you wish to return to the main menu, just refresh the
              page, except for Contact Us, as it is included in the routes.
            </div>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setIsExpSplitterOpen(true);
                  setViewTrends(false);
                  setFaq(false);
                  setContactUs(false);
                }}
                fullWidth
              >
                Add Group Expense
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setViewTrends(true);
                  setIsExpSplitterOpen(false);
                  setFaq(false);
                  setContactUs(false);
                }}
                fullWidth
              >
                View Spending Trend
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setFaq(true);
                  setViewTrends(false);
                  setIsExpSplitterOpen(false);
                  setContactUs(false);
                }}
                fullWidth
              >
                FAQs
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setFaq(false);
                  setViewTrends(false);
                  setIsExpSplitterOpen(false);
                  setContactUs(true);
                }}
                fullWidth
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
      {isExpSplitterOpen && (
        <ExpenseSplitter groups={groups} handleOpenModal={handleOpenModal} />
      )}
      {viewTrends && <ExpenseGraph />}
      <MemberSearchModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleGroupSubmit={handleGroupSubmit}
      />
      {faq && <FAQ />}
      {contactUs && <ContactUsPage />}
    </div>
  );
};

export default App;
