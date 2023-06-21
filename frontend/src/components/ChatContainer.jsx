import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

import { GetAllMessagesRoute, SendMessageRoute } from '../utils/APIRoutes';

function ChatContainer({ curChat, curUser, socket }) {
	const [msgs, setMsgs] = useState([]);
	const [arrivalMsg, setArrivalMsg] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		(async () => {
			const res = await axios.post(GetAllMessagesRoute, {
				from: curUser._id,
				to: curChat._id,
			});

			setMsgs(res.data);
		})();
	}, [curChat]);

	const handleSendMsg = async (msg) => {
		await axios.post(SendMessageRoute, {
			from: curUser._id,
			to: curChat._id,
			msg: msg,
		});
		socket.current.emit('send-msg', {
			to: curChat._id,
			from: curUser._id,
			msg: msg,
		});

		const messages = [...msgs];
		messages.push({ fromSelf: true, message: msg });
		setMsgs(messages);
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-receive', (msg) => {
				setArrivalMsg({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMsg && setMsgs((prevMsgs) => [...prevMsgs, arrivalMsg]);
	}, [arrivalMsg]);

	useEffect(() => {
		scrollRef.current &&
			scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
	}, [msgs]);

	return (
		<Container>
			<div className='chat-header'>
				<div className='user-details'>
					<div className='avatar'>
						<img
							src={`data:image/svg+xml;base64,${curChat.avatar}`}
							alt='avatar'
						/>
					</div>
					<div className='username'>
						<h3>{curChat.username}</h3>
					</div>
				</div>
			</div>
			<div className='chat-messages'>
				{msgs.map((msg) => {
					return (
						<div
							className={`message ${msg.fromSelf ? 'sended' : 'received'}`}
							ref={scrollRef}
							key={uuidv4()}
						>
							<div className='content'>
								<p>{msg.message}</p>
							</div>
						</div>
					);
				})}
			</div>
			{/* <Messages /> */}

			<ChatInput handleSendMsg={handleSendMsg} />
		</Container>
	);
}

const Container = styled.div`
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
	max-height: 100%;
	overflow: hidden;

	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;

		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;
			.avatar {
				img {
					height: 3rem;
				}
			}
		}
	}

	.chat-messages {
		width: 100%;
		height: 100%;

		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow: auto;

		.message {
			display: flex;
			align-items: center;
			max-width: 70%;

			border-radius: 1rem;

			.content {
				width: 100%;
				overflow-wrap: break-word;

				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;

				color: #d1d1d1;
			}
		}

		.sended {
			justify-content: flex-end;
			margin-left: auto;
			background-color: #4f04ff21;
		}

		.received {
			justify-content: flex-start;
			margin-right: auto;
			background-color: #9900ff20;
		}

		&::-webkit-scrollbar {
			width: 0.8rem;
			&-thumb {
				background-color: #ffffff20;
				width: 0.4rem;
				border-radius: 1rem;
			}
		}
	}
`;

export default ChatContainer;
