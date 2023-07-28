import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DialogTitle, DialogContent } from '@mui/material';
import AddTransaction from '../PersonalTransaction/AddTransaction';
import { CalendarContainer, StyledDialog } from './styles';
import './styles.css';
import moment from 'moment-timezone';

const localizer = momentLocalizer(moment);

const ColoredEvent = ({ event }) => {
	return (
		<div style={{ padding: '5px', color: event.color }}>{event.title}</div>
	);
};

const CalendarView = () => {
	const [events, setEvents] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [refresh, setRefresh] = useState(false); // new state
	const userId = sessionStorage.getItem('userId');

	const fetchTransactions = () => {
		axios
			.post('/personalTransactions', { userId })
			.then((response) => {
				const date = moment
					.utc(response.data.transactions.date)
					.tz('America/Halifax');
				const events = response.data.transactions.map(
					(transaction) => ({
						start: new Date(date),
						end: new Date(date),
						title: `${transaction.category}: ${transaction.amount}`,
						color:
							transaction.typeOfTransaction === 'Income'
								? 'green'
								: 'red',
						allDay: true,
					})
				);
				console.log('Updating events:', events);
				setEvents(events);
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});
	};

	useEffect(() => {
		fetchTransactions();
	}, [refresh]); // dependency array now includes refresh

	const handleSelectSlot = (slotInfo) => {
		setSelectedDate(slotInfo.start);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setRefresh(!refresh); // toggles refresh state when dialog is closed
	};

	return (
		<CalendarContainer>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				allDayAccessor='allDay'
				onSelectSlot={handleSelectSlot}
				selectable={true}
				components={{
					event: ColoredEvent,
				}}
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
