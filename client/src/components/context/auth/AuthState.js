import React, { useReducer } from 'react'
import AuthReducer from './AuthReducer'
import authContext from './AuthContext'
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
        user: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, intitialState)

    //Load User


    //Register User

    //Login User

    //Logout 

    //Clear Errors

    const { token, isAuthenticated, loading, error, user } = state
        
    return(
        <authContext.Provider value={{
            token,
            isAuthenticated,
            loading,
            error,
            user
        }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState