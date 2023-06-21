import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { RegisterRoute } from '../utils/APIRoutes';

import Logo from '../assets/logo.svg';

function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 10000,
		pauseOnHover: true,
		draggable: false,
		theme: 'dark',
	};

	useEffect(() => {
		if (localStorage.getItem('mern-chat-user')) {
			navigate('/');
		}
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			// Call API to register
			const { username, email, password } = values;
			const { data } = await axios.post(RegisterRoute, {
				username,
				email,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}

			if (data.status === true) {
				localStorage.setItem('mern-chat-user', JSON.stringify(data.user));
				navigate('/');
			}
		}
		// alert("Form Submit");
	};

	const handleValidation = () => {
		const { username, password, confirmPassword } = values;

		if (password !== confirmPassword) {
			toast.error('Password and Confirm Password should be same', toastOptions);
			return false;
		} else if (username.length < 3) {
			toast.error('Username should be atleast 3 characters', toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error('Password should be atleast 8 characters', toastOptions);
			return false;
		}

		return true;
	};

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	return (
		<>
			<FormContainer>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='brand'>
						<img src={Logo} alt='' />
						<h1>Chitthi</h1>
					</div>

					<input
						type='text'
						name='username'
						placeholder='Username'
						onChange={(e) => handleChange(e)}
					/>

					<input
						type='email'
						name='email'
						placeholder='Email address'
						onChange={(e) => handleChange(e)}
					/>

					<input
						type='password'
						name='password'
						placeholder='Password'
						onChange={(e) => handleChange(e)}
					/>

					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						onChange={(e) => handleChange(e)}
					/>

					<button type='submit'>Create User</button>

					<span>
						Already have an account? <Link to='/login'>Login</Link>
					</span>
				</form>
			</FormContainer>

			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	gap: 1rem;

	form {
		display: flex;
		flex-direction: column;

		justify-content: center;
		align-items: center;

		gap: 1rem;
		padding: 2rem;
		border-radius: 2rem;

		background-color: #00000076;

		input {
			--input-border-color: #4e0eff;
			width: 100%;
			height: 100%;

			color: white;
			background-color: transparent;
			padding: 0.7rem;
			border: 0.2rem solid var(--input-border-color);
			border-radius: 0.4rem;

			&:focus {
				--input-border-color: #aa8bf2;
				outline: none;
			}
		}

		button {
			--button-color: #6e2eff;

			width: 100%;
			height: 100%;
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

		span {
			color: white;

			a {
				color: #997af0;
				text-decoration: none;
				transition: all 0.25s ease;

				&:hover {
					color: #6e2eff;
				}
			}
		}
	}

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;

		gap: 1rem;

		img {
			height: 5rem;
		}

		h1 {
			text-transform: uppercase;
			color: white;
		}
	}
`;

export default Register;
