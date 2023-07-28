const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const register = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return res.status(409).json({ error: 'Email already exists.' });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			firstname: firstName,
			lastname: lastName,
			email: email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(200).json({ message: 'Registration successful.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'Registration failed. Please try again.',
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	console.log('req', req.body);

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid password.' });
		}

		const token = jwt.sign(
			{
				email: user.email,
				userId: user._id,
			},
			'This i$ very very h@rd TOKEN_SECRET!!!',
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			message: 'Login successful.',
			userId: user._id,
			token: token,
			expiresIn: 3600,
		});
	} catch (error) {
		res.status(500).json({ error: 'Login failed. Please try again.' });
	}
};

//  implement password reset logic here

module.exports = {
	register,
	login,
};
