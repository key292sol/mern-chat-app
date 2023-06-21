import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { HOST, AllUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

import { io } from 'socket.io-client';

function Chat() {
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [curUser, setCurUser] = useState(undefined);
	const [curChat, setCurChat] = useState(undefined);

	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('mern-chat-user')) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		(async () => {
			setCurUser(await JSON.parse(localStorage.getItem('mern-chat-user')));
		})();
	}, []);

	useEffect(() => {
		if (curUser) {
			socket.current = io(HOST);

			socket.current.emit('add-user', curUser._id);
		}
	}, [curUser]);

	useEffect(() => {
		(async () => {
			if (curUser) {
				if (!curUser.isAvatarSet) {
					navigate('/setAvatar');
				}

				const { data } = await axios.get(`${AllUsersRoute}/${curUser._id}`);
				setContacts(data);
			}
		})();
	}, [curUser]);

	const handleChatChange = (chat) => {
		setCurChat(chat);
	};

	return (
		<Container>
			<div className='container'>
				<Contacts
					contacts={contacts}
					curUser={curUser}
					changeChat={handleChatChange}
				/>

				{curChat === undefined ? (
					<Welcome curUser={curUser} />
				) : (
					<ChatContainer curChat={curChat} curUser={curUser} socket={socket} />
				)}
			</div>
		</Container>
	);
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000075;

		display: grid;
		grid-template-columns: 25% 75%;

		@media screen and (width >= 720px) and (width < 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;

export default Chat;
