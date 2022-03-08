import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function ProtectedRoutes({ children }) {
  // const isAuthenticated = localStorage.getItem('user')
  const isAuthenticated = Cookies.get('token')
  console.log(isAuthenticated,'first from protected routes');
  return (
    // <Route
    //   {...restOfProps}
    //   render={(props) =>
    //     isAuthenticated ? <Component {...props} /> : <Navigate to='/login' />
    //   }
    // />
    // <Route
    //   {...restOfProps}
    //   render={(props) => {
    //     if (isAuthenticated) return React.cloneElement(Component, { ...props })
    //     if (!isAuthenticated) return <Navigate to='/login' />
    //     return null
    //   }}
    // />
    isAuthenticated ? children : <Navigate to='/login' />
  )
}
export default ProtectedRoutes
