import React, { useState, useEffect, useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'
import AuthContext from '../context/auth/AuthContext'
import { Navigate } from 'react-router-dom'

const Login = () => {
	const authContext = useContext(AuthContext)
	const alertContext = useContext(AlertContext)
	const { login, error, clearErrors, isAuthenticated } = authContext
	const { setAlert } = alertContext
	const [user, setUser] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		if(error === 'Invalid Credentials'){
			  setAlert(error, 'danger')
			  clearErrors()
		  }
		  // eslint-disable-next-line
	  },[error])

	const { email, password } = user

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if(email === '' || password === '') {
			setAlert('please fill in all fields', 'danger')
		} else {
			login({
				email,
				password
			})
		}
    }

	if (isAuthenticated) return <Navigate to='/' />
    
	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={onSubmit}>
                <div>
				<label htmlFor='email'>Email</label>
					<input 
                      type='email' 
                      name='email' 
                      value={email} 
                      onChange={onChange}
                    />
				<label htmlFor='password'>Password</label>
					<input
					  type='password'
					  name='password'
					  value={password}
					  onChange={onChange}
					/>					
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	)
}

export default Login
