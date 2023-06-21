import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { SetAvatarRoute } from '../utils/APIRoutes';

import Loader from '../assets/loader.gif';

export default function SetAvatar() {
	const api = `https://api.multiavatar.com/4645646`;
	const navigate = useNavigate();

	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatar, setSelectedAvatar] = useState(undefined);

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 10000,
		pauseOnHover: true,
		draggable: false,
		theme: 'dark',
	};

	const setProfiePicture = async () => {
		if (selectedAvatar === undefined) {
			toast.error('Please select an Avatar', toastOptions);
		} else {
			const user = await JSON.parse(localStorage.getItem('mern-chat-user'));
			const { data } = await axios.post(`${SetAvatarRoute}/${user._id}`, {
				image: avatars[selectedAvatar],
			});

			console.log(data);

			if (data.isSet) {
				user.isAvatarSet = true;
				user.avatar = data.image;
				localStorage.setItem('mern-chat-user', JSON.stringify(user));

				navigate('/');
			} else {
				toast.error(
					'Error setting the avatar. Please try again.',
					toastOptions
				);
			}
		}
	};

	useEffect(() => {
		if (!localStorage.getItem('mern-chat-user')) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		(async () => {
			const data = [];
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`
				);
				const buffer = new Buffer(image.data);
				data.push(buffer.toString('base64'));
			}

			setAvatars(data);
			setIsLoading(false);
		})();
	}, []);

	return (
		<>
			{isLoading ? (
				<Container>
					<img src={Loader} alt='Loding GIF' />
				</Container>
			) : (
				<Container>
					<div className='title-container'>
						<h1>Pick an Avatar</h1>
						<div className='avatars'>
							{avatars.map((avatar, index) => {
								return (
									<div
										className={`avatar ${
											selectedAvatar === index ? 'selected' : ''
										}`}
										key={avatar}
									>
										<img
											src={`data:image/svg+xml;base64,${avatar}`}
											alt='avatar'
											onClick={() => setSelectedAvatar(index)}
										/>
									</div>
								);
							})}
						</div>
					</div>

					<button className='submit-button' onClick={() => setProfiePicture()}>
						Set as Profile Picture
					</button>
				</Container>
			)}
			<ToastContainer />
		</>
	);
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	height: 100vh;
	width: 100vw;

	.loader {
	}

	h1 {
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
	}

	.avatars {
		display: flex;
		gap: 2rem;

		.avatar {
			cursor: pointer;
			border: 0.4rem solid transparent;
			padding: 0.4rem;
			border-radius: 5rem;

			display: flex;
			justify-content: center;
			align-items: center;

			transition: 0.25s ease-in-out;

			img {
				height: 6rem;
			}
		}
		.selected {
			border-color: #4e0eff;
		}
	}

	.submit-button {
		--button-color: #6e2eff;

		cursor: pointer;

		color: white;
		background-color: var(--button-color);
		padding: 0.7rem;

		border: none;
		border-radius: 0.4rem;

		font-weight: bold;
		text-transform: uppercase;

		transition: all 0.25s ease;

		&:hover {
			--button-color: #1a16aa;
			outline: none;
		}
	}
`;
