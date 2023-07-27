import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Slider from "react-slick";
import ExpenseSplitter from "../ExpenseSplitter/index";
import MemberSearchModal from "../NewGroupModal/index";
import axios from "axios";

const GroupExpensePage = ({ handleExpenseSubmit }) => {
  const currentUser = sessionStorage.getItem("userId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!groups.length) {
      getGroupDetails();
    }
  }, []);

  const getGroupDetails = () => {
    console.log("currentUser" + currentUser);
    axios
      .get(`/groups/${currentUser}`)
      .then((res) => {
        if (res?.data?.length) {
          setGroups(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGroupSubmit = (groupDetails) => {
    console.log(groupDetails);
    //todo: save group to db
    axios
      .post("/addGroup", groupDetails)
      .then((result) => {
        console.log("success");
        getGroupDetails();
      })
      .catch((error) => {
        console.log("failure");
      });
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
      <div className="page-container GroupExpensePage">
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
                  {isModalOpen && (
                    <MemberSearchModal
                      open={isModalOpen}
                      handleClose={handleCloseModal}
                      handleGroupSubmit={handleGroupSubmit}
                    />
                  )}
                </Grid>
              </Grid>
            </form>
          </div>
        </Slider>
      </div>
    </>
  );
};
export default GroupExpensePage;
