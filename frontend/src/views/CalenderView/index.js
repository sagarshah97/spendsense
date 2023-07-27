import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import AddTransaction from "../PersonalTransaction/AddTransaction";
import {
  CalendarContainer,
  DialogContentContainer,
  StyledDialog,
} from "./styles";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get("/personalTransactions")
      .then((response) => {
        const events = response.data.transactions.map((transaction) => ({
          start: new Date(transaction.date),
          end: new Date(transaction.date),
          title: `${transaction.category}: ${transaction.amount}`,
          note: transaction.note,
        }));
        setEvents(events);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dayBoxStyle = {
    height: "200px", // You can adjust this value to increase or decrease the height
  };

  return (
    <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable={true}
        dayPropGetter={() => ({ style: dayBoxStyle })}
      />
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <AddTransaction selectedDate={selectedDate} />
        </DialogContent>
      </StyledDialog>
    </CalendarContainer>
  );
};

export default CalendarView;
