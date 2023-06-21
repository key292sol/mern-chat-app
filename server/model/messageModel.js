const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		users: Array,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Messages', messageSchema);
