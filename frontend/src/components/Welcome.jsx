import React from 'react';
import styled from 'styled-components';

import Robot from '../assets/robot_hello.gif';

function Welcome({ curUser }) {
	return (
		<Container>
			<img src={Robot} alt='Hello!' />
			{curUser ? (
				<h1>
					Welcome, <span>{curUser.username}</span>
				</h1>
			) : (
				<></>
			)}
			<h3>Select a chat to start messaging</h3>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	img {
		height: 20rem;
	}

	span {
		color: #4e00ff;
	}
`;

export default Welcome;
