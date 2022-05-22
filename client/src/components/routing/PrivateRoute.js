import React, { useContext } from "react"
import AuthContext from "../context/auth/AuthContext"
import { Navigate }  from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
    const { isAuthenticated, loading } = authContext
   
    if (isAuthenticated) return <Component />;
    return <Navigate to='/login' />;
}

export default PrivateRoute;
