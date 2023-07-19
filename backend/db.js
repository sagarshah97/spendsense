const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://harshvaghani:adminadmin@projectti.zpzobjv.mongodb.net/'
	)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log(error);
	});

module.exports = mongoose;
