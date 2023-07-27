import React, { useState, useEffect } from 'react';
import {
	Grid,
	FormControl,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import moment from 'moment';

const IncomePage = ({ handleIncomeSubmit, selectedDate }) => {
	const [amount, setAmount] = useState(0);
	const [category, setCategory] = useState('');
	const [note, setNote] = useState('');
	const [date, setDate] = useState('');

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

	// Changes made by Harsh Vaghani
	useEffect(() => {
		if (selectedDate) {
			setDate(moment(selectedDate).format('YYYY-MM-DD'));
		}
	}, [selectedDate]);

	const userId = sessionStorage.getItem('userId');
	const handleSubmit = (event) => {
		event.preventDefault();
		handleIncomeSubmit({ amount, category, note, date });
		axios
			.post('/personalTransaction/add', {
				date,
				amount,
				category,
				note,
				typeOfTransaction: 'Income', // Set the type of transaction
				userId,
			})
			.then((response) => {
				console.log('Income transaction added:', response.data);
				// Handle any success actions or feedback here
			})
			.catch((error) => {
				console.error(error);
				// Handle any error actions or feedback here
			});
		setAmount(0);
		setCategory('');
		setNote('');
		setDate('');
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<div className='page-container IncomePage'>
			<h1 style={{ overflowWrap: 'anywhere' }}>Income</h1>

			<Slider {...settings}>
				<div>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<FormControl fullWidth variant='outlined'>
									{/* <InputLabel htmlFor="date">Date</InputLabel> */}
									<TextField
										type='date'
										id='date'
										value={date}
										onChange={handleDateChange}
										// InputLabelProps={{
										//   shrink: true,
										// }}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth variant='outlined'>
									{/* <InputLabel htmlFor="amount">Amount</InputLabel> */}
									<TextField
										type='number'
										id='amount'
										label='Amount'
										value={amount}
										onChange={handleAmountChange}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth variant='outlined'>
									<InputLabel htmlFor='category'>
										Category
									</InputLabel>
									<Select
										id='category'
										value={category}
										onChange={handleCategoryChange}
									>
										<MenuItem value=''>
											Select a category
										</MenuItem>
										<MenuItem value='Salary'>
											Salary
										</MenuItem>
										<MenuItem value='Freelance'>
											Freelance
										</MenuItem>
										<MenuItem value='Investments'>
											Investments
										</MenuItem>
										<MenuItem value='Gift'>Gift</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth variant='outlined'>
									<InputLabel htmlFor='note'>Note</InputLabel>
									<TextField
										id='note'
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
								<Button
									type='submit'
									variant='contained'
									color='primary'
								>
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

export default IncomePage;
