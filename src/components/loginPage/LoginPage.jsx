import './LoginPage.css'
import Input from '../UI/Input/Input'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const nameValid = RegExp(/[0-9]/)
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)
const validatPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

const initialLogin = {
	userName: {
		value: '',
		isValid: null,
	},
	userEmail: {
		value: '',
		isValid: null,
	},
	userPassword: {
		value: '',
		isValid: null,
	},
}

function loginReduser(state, action) {
	switch (action.type) {
		case 'NAME_VALUE': {
			return {
				...state,
				userName: {
					value: action.value,
					isValid: nameValid.test(state.userName.value)
						? true
						: false,
				},
			}
		}
		case 'NAME_IS_VALID': {
			return {
				...state,
				userName: {
					value: state.userName.value,
					isValid: nameValid.test(state.userName.value)
						? true
						: false,
					error: nameValid.test(state.userName.value)
						? ''
						: state.userName.value === ''
						? 'Ошибка'
						: 'Не правильно',
				},
			}
		}
		case 'EMAIL_VALUE': {
			return {
				...state,
				userEmail: {
					value: action.value,
					isValid: validEmailRegex.test(action.value),
				},
			}
		}
		case 'EMAIL_IS_VALID': {
			return {
				...state,
				userEmail: {
					value: state.userEmail.value,
					isValid: validEmailRegex.test(state.userEmail.value)
						? true
						: false,
					error: validEmailRegex.test(state.userEmail.value)
						? ''
						: state.userEmail.value === ''
						? 'Ошибка'
						: 'Не правильно',
				},
			}
		}
		case 'PASSWORD_VALUE': {
			const firstNum = action.value.split('', 2).join('')
			const pass = action.value.split('').reverse().join('')
			return {
				...state,
				userPassword: {
					value: pass + firstNum,
					isValid: validatPassword.test(action.value),
				},
			}
		}
		case 'PASSWORD_IS_VALID': {
			return {
				...state,
				userPassword: {
					value: state.userPassword.value,
					isValid: validatPassword.test(state.userPassword.value)
						? true
						: false,
					error: validatPassword.test(state.userPassword.value)
						? ''
						: state.userPassword.value === ''
						? 'Ошибка'
						: 'Не правильно',
				},
			}
		}

		default:
			return initialLogin
	}
}
const LoginPage = () => {
	const navigate = useNavigate()
	const [login, dispatchLogin] = useReducer(loginReduser, initialLogin)
	const [formIsValid, setFormIsValid] = useState(false)

	const submitHandler = (e) => {
		e.preventDefault()
		return navigate('/Hello')
	}
	useEffect(() => {
		setFormIsValid(
			login.userName.isValid &&
				login.userEmail.isValid &&
				login.userPassword.isValid,
		)
	}, [
		login.userName.isValid,
		login.userEmail.isValid,
		login.userPassword.isValid,
	])
	const nameHandler = (e) => {
		dispatchLogin({ type: 'NAME_VALUE', value: e.target.value })
	}
	const nameIsValid = (e) => {
		dispatchLogin({ type: 'NAME_IS_VALID' })
	}
	// --
	const emailHandler = (e) => {
		dispatchLogin({ type: 'EMAIL_VALUE', value: e.target.value })
	}
	const emailIsValid = (e) => {
		dispatchLogin({ type: 'EMAIL_IS_VALID' })
	}
	// --
	const passwordHandler = (e) => {
		dispatchLogin({ type: 'PASSWORD_VALUE', value: e.target.value })
	}
	const passwordIsValid = (e) => {
		dispatchLogin({ type: 'PASSWORD_IS_VALID' })
	}
	// --
	return (
		<>
			<form onSubmit={submitHandler} className='box'>
				<h1>Login</h1>
				<p>Cola Pepsi Beybars Seksi</p>
				<Input
					valid={login.userName.isValid}
					onChange={nameHandler}
					onBlur={nameIsValid}
					type='text'
					placeholder='Username'
				/>
				<Input
					valid={login.userEmail.isValid}
					onChange={emailHandler}
					onBlur={emailIsValid}
					type='email'
					placeholder='Email'
				/>
				<Input
					valid={login.userPassword.isValid}
					onChange={passwordHandler}
					onBlur={passwordIsValid}
					type='password'
					placeholder='Password'
				/>
				<a className='forgot text-muted' href='#'>
					Forgot password?
				</a>
				<button
					disabled={!formIsValid}
					type='submit'
					className='btnLogin'
				>
					Login
				</button>
			</form>
		</>
	)
}

export default LoginPage
