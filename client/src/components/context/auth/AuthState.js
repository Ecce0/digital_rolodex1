import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import authContext from './AuthContext'
import axios from 'axios'
import setAuthToken from '../../../utils/setAuthToken'
import {
	REGISTER_SUCCESS,
	USER_LOADED,
	LOGIN_SUCCESS,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types'

const AuthState = ({ children }) => {
	const intitialState = {
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	}

	const [state, dispatch] = useReducer(AuthReducer, intitialState)

	//Load User
	const loadUser = async () => {
		const { token } = state
		if(localStorage.token) {
			setAuthToken(localStorage.token)
		}

		const config = {
			headers: {
				'Content-type': 'application/json',
				'x-auth-token': token
			}
		}
		
		const res = await axios.get('/api/auth', config)
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
	}
	

	//Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
			}
		}

		const res = await axios.post('/api/users', formData, config)
		 dispatch({ 
			type: REGISTER_SUCCESS, 
			payload: res.data
		 })
			
			loadUser()		
	}

	//Login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

		const res = await axios.post('/api/auth', formData, config)
			dispatch({ 
				type: LOGIN_SUCCESS, 
				payload: res.data
			})
			
			loadUser()	
	}

	//Logout
	const logout = () => {
		localStorage.removeItem('token')
		dispatch({
			type: LOGOUT
		})
	}

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
				loadUser,
				login,
				logout
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthState
