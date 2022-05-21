import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import authContext from './AuthContext'
import axios from 'axios'
import setAuthToken from '../../../utils/setAuthToken'
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
	const loadUser = async () => {
		if(localStorage.token) {
			setAuthToken(localStorage.token)
		}

		try {
			const res = await axios.get('/api/auth')
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		} catch (error) {
			dispatch({
				type: AUTH_ERROR
			})
		}
	}
	

	//Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			}
		}

		try {
			const res = await axios.post('/api/users', formData, config)
			dispatch({ 
				type: REGISTER_SUCCESS, 
				payload: res.data
			})
			loadUser()
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
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS})
	}

	const { token, isAuthenticated, loading, error, user } = state

	return (
		<authContext.Provider
			value={{
				token,
				isAuthenticated,
				loading,
				error,
				user,
				register,
				clearErrors,
				loadUser
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthState
