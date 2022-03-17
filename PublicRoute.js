import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children, notLoggedIn}) => {
    
    return notLoggedIn ? children : <Navigate to='/'/>
}

export default PublicRoute
