import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Logo from '../assets/logo.svg';
import Logout from './Logout';

function Contacts({ contacts, curUser, changeChat }) {
	const [curUserName, setCurUserName] = useState(undefined);
	const [curUserImage, setCurUserImage] = useState(undefined);
	const [curSelected, setCurSelected] = useState(undefined);
	useEffect(() => {
		if (curUser) {
			setCurUserImage(curUser.avatar);
			setCurUserName(curUser.username);
		}
	}, [curUser]);

	const changeCurChat = (index, contact) => {
		setCurSelected(index);
		changeChat(contact);
	};
	return (
		<>
			{curUserImage && curUserName ? (
				<Container>
					<div className='brand'>
						<img src={Logo} alt='Logo' />
						<h3>Chitthi</h3>
					</div>
					<div className='contacts'>
						{contacts.map((contact, i) => {
							return (
								<div
									className={`contact ${i === curSelected ? 'selected' : ''}`}
									key={i}
									onClick={() => changeCurChat(i, contact)}
								>
									<div className='avatar'>
										<img
											src={`data:image/svg+xml;base64,${contact.avatar}`}
											alt='avatar'
										/>
									</div>
									<div className='username'>
										<h3>{contact.username}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className='current-user'>
						<div className='avatar'>
							<img
								src={`data:image/svg+xml;base64,${curUserImage}`}
								alt='avatar'
							/>
						</div>
						<div className='username'>
							<h2>{curUserName}</h2>
						</div>
						<Logout />
					</div>
				</Container>
			) : (
				<div>Hello</div>
			)}
		</>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;

		img {
			height: 2rem;
		}

		h3 {
			text-transform: uppercase;
		}
	}

	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		padding: 0.8rem;
		gap: 0.8rem;

		&::-webkit-scrollbar {
			width: 0.5rem;
			&-thumb {
				background-color: #ffffff20;
				width: 0.4rem;
				border-radius: 1rem;
			}
		}

		.contact {
			width: 100%;
			display: flex;
			gap: 0.8rem;
			background-color: #ffffff20;

			border-radius: 0.5rem;
			padding: 0.5rem;

			cursor: pointer;
			transition: 0.3s ease-in-out;

			.avatar {
				height: 3rem;
				img {
					height: 3rem;
				}
			}

			.username {
			}
		}
		.selected {
			background-color: #9186f3;
		}
	}

	.current-user {
		background-color: #0d0d30;
		display: flex;
		justify-content: space-evenly;
		align-items: center;

		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}
		.username {
		}
	}

	// @media screen and (width >= 720px) and (width < 1080px) {
	// 	gap: 0.5rem;

	// 	.username {
	// 		h2 {
	// 			font-size: 1rem;
	// 		}
	// 	}
	// }
`;

export default Contacts;
