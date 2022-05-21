import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import authContext from './AuthContext'
import axios from 'axios'
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types'

const AuthState = ({ children }) => {
	const intitialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, intitialState)

	//Load User
	

	//Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		}

		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({ type: REGISTER_SUCCESS, payload: res.data})
		} catch (error) {
			dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.msg
			})
		}
	}

	//Login User

	//Logout

	//Clear Errors

	const { token, isAuthenticated, loading, error, user } = state

	return (
		<authContext.Provider
			value={{
				token,
				isAuthenticated,
				loading,
				error,
				user,
				register
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthState
