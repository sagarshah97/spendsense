import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	styled,
	Grid,
	Container,
	IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableContainer = styled(TableContainer)({
	width: '80%',
	maxWidth: 800,
	margin: '0 auto',
	marginTop: (theme) => theme.spacing(2),
});

const StyledTableCellHeader = styled(TableCell)({
	fontWeight: 'bold',
});

const StyledIncomeRow = styled(TableRow)({
	backgroundColor: '#c9ffd7',
});

const StyledExpenseRow = styled(TableRow)({
	backgroundColor: '#ffb0b0',
});

const PersonalTransaction = () => {
	const [data, setData] = useState([]);
	const [total, setTotal] = useState('');
	const userId = sessionStorage.getItem('userId');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios
			.post('/personalTransactions', { userId })
			.then((response) => {
				setTotal(
					response.data.transactions.reduce(
						(total, transaction) =>
							transaction.typeOfTransaction === 'Income'
								? total + transaction.amount
								: total - transaction.amount,
						0
					)
				);
				setData(
					response.data.transactions.sort((a, b) =>
						a.date > b.date ? 1 : -1
					)
				);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleDelete = (transactionId) => {
		console.log(transactionId);
		// Delete the transaction from the backend API
		axios
			.delete(`/personalTransaction/delete/${transactionId}`)
			.then((response) => {
				console.log('Transaction deleted:', response.data);
				// Refresh the data by refetching it from the backend API
				fetchData();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	console.log('userId', userId);

	// Get the navigate function from React Router
	const navigate = useNavigate();

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Transactions</h1>
			<Container
				maxWidth='md'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '2%',
				}}
			>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Button
						variant='contained'
						onClick={() => {
							navigate('/addTransaction');
						}}
						fullWidth
					>
						Personal Expense Tracker
					</Button>
				</Grid>
			</Container>
			<StyledTableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<StyledTableCellHeader>Date</StyledTableCellHeader>
							<StyledTableCellHeader>
								Amount
							</StyledTableCellHeader>
							<StyledTableCellHeader>
								Category
							</StyledTableCellHeader>
							<StyledTableCellHeader>Note</StyledTableCellHeader>
							<StyledTableCellHeader>
								Actions
							</StyledTableCellHeader>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item) => (
							<TableRow
								key={item._id}
								className={`transaction-${item.typeOfTransaction.toLowerCase()} ${
									item.typeOfTransaction === 'Income'
										? 'incomeRow'
										: 'expenseRow'
								}`}
								component={
									item.typeOfTransaction === 'Income'
										? StyledIncomeRow
										: StyledExpenseRow
								}
							>
								<TableCell>
									{
										new Date(item.date)
											.toISOString()
											.split('T')[0]
									}
								</TableCell>
								<TableCell>{'$' + item.amount}</TableCell>
								<TableCell>{item.category}</TableCell>
								<TableCell>{item.note}</TableCell>
								<TableCell>
									{/* <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const route =
                        item.typeOfTransaction === "Expense"
                          ? "/update/expense"
                          : "/update/income";
                      navigate(route, {
                        state: { transactionId: item.transactionId },
                      });
                    }}
                  > */}
									<IconButton
										aria-label='edit'
										onClick={() => {
											const route =
												item.typeOfTransaction ===
												'Expense'
													? '/update/expense'
													: '/update/income';
											navigate(route, {
												state: {
													transactionId:
														item.transactionId,
												},
											});
										}}
									>
										<EditIcon />
									</IconButton>

									{/* </Button> */}
									{/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.transactionId)}
                  >
                    Delete
                  </Button> */}
									<IconButton
										aria-label='delete'
										onClick={() =>
											handleDelete(item.transactionId)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
						<TableRow>
							<TableCell>Total</TableCell>
							<TableCell
								style={{ color: total >= 0 ? 'green' : 'red' }}
							>
								{'$' + total}
							</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</StyledTableContainer>
		</div>
	);
};

export default PersonalTransaction;
