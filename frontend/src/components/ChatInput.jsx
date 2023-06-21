import React, { useState } from 'react';
import styled from 'styled-components';
// import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({ handleSendMsg }) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [msg, setMsg] = useState('');

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const sendChat = (e) => {
		e.preventDefault();
		let message = msg.trim();

		if (message.length > 0) {
			handleSendMsg(message);
			setMsg('');
		}
	};

	return (
		<Container>
			<div className='button-container'>
				<div className='emoji'>
					<BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
					{/* For showing emoji picker. But Gives error. Need to fix later */}
					{/* {showEmojiPicker && <EmojiPicker />} */}
				</div>
			</div>
			<form className='input-container' onSubmit={(e) => sendChat(e)}>
				<input
					type='text'
					placeholder='Type your message here'
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button className='submit'>
					<IoMdSend />
				</button>
			</form>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	gap: 0.7rem;

	background-color: #080420;
	padding: 0.5rem 2rem;
	padding-bottom: 0.3rem;

	.button-container {
		display: flex;
		align-items: center;

		.emoji {
			position: relative;
			cursor: pointer;

			svg {
				font-size: 1.5rem;
				color: #ffff00c8;
			}
		}
	}
	.input-container {
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		gap: 0.7rem;

		input {
			width: 100%;
			height: 100%;

			color: white;
			background-color: #ffffff34;
			border: none;

			padding: 0 1rem;
			font-size: 1.2rem;
			border-radius: 20rem;

			&::selection {
				background-color: #9186f3;
			}
		}

		button {
			padding: 0.3rem 2rem;
			border-radius: 20rem;
			display: flex;
			align-items: center;
			justify-content: center;

			background-color: #9a86f3;
			border: none;

			svg {
				font-size: 2rem;
				color: white;
			}
		}
	}
`;

export default ChatInput;
