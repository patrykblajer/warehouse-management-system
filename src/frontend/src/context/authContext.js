import React from 'react'
const AuthContext = React.createContext({
	isAuthenticated: false,
	hideBestHotel: true,
	login: () => {},
	logout: () => {},
})

AuthContext.displayName = 'AuthContext'

export default AuthContext
