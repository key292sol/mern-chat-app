const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/userRoutes');
const { messagesRoutes } = require('./routes/messagesRoute');

const socket = require('socket.io');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/msgs', messagesRoutes);

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongoose connection successful');
	})
	.catch((err) => {
		console.error(err.message);
	});

const PORT = process.env.PORT || 4040;
const server = app.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});

const io = socket(server, {
	cors: {
		origin: 'http://localhost:3000',
		credentials: true,
	},
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-receive', data.msg);
		}
	});
});
