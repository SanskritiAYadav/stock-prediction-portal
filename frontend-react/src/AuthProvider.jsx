import {useState, useContext, createContext} from 'react'
import React from 'react'
const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('access_token') ? true : false)


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export {AuthContext}