import React from 'react'

const publicroute = ({children}) => {
    const{isLoggedIn} = useContext(AuthContext);
  return !isLoggedIn ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  )
}

export default publicroute