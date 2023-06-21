const Messages = require('../model/messageModel');

module.exports.addMsg = async (req, res, next) => {
	try {
		const { from, to, msg } = req.body;
		const data = await Messages.create({
			message: msg,
			users: [from, to],
			sender: from,
		});

		if (data) {
			return res.json({ msg: 'Message sent successfully', status: true });
		} else {
			return res.json({ msg: 'Failed to send message', status: false });
		}
	} catch (error) {
		next(er);
	}
};

module.exports.getAllMsg = async (req, res, next) => {
	try {
		const { from, to } = req.body;
		const messages = await Messages.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });

		const projectedMsgs = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() == from,
				message: msg.message,
			};
		});

		return res.json(projectedMsgs);
	} catch (error) {
		next(error);
	}
};
