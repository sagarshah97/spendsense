import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Slider from 'react-slick';
import ExpenseSplitter from '../ExpenseSplitter/index';
import MemberSearchModal from '../NewGroupModal/index';

const GroupExpensePage = ({ handleExpenseSubmit }) => {
	const currentUser = 'John Wick';
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [groups, setGroups] = useState([
		{
			id: 1,
			name: 'Group A',
			members: [
				'John Wick',
				'Jake Peralta',
				'Alice Smith',
				'Kate Winslet',
			],
		},
		{
			id: 2,
			name: 'Group B',
			members: [
				'John Wick',
				'Bob Murray',
				'Charlie Chaplin',
				'Evangeline Lily',
			],
		},
		{
			id: 3,
			name: 'Group C',
			members: ['Mike Ross', 'John Wick', 'Sarah Connor', 'Tom Felton'],
		},
	]);

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
			<div className='page-container GroupExpensePage'>
				<h1 style={{ overflowWrap: 'anywhere' }}>Shared Expense</h1>

				<Slider {...settings}>
					<div>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<ExpenseSplitter
										groups={groups}
										handleOpenModal={handleOpenModal}
									/>
									<MemberSearchModal
										open={isModalOpen}
										handleClose={handleCloseModal}
										handleGroupSubmit={handleGroupSubmit}
									/>
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
