import React from 'react'
const ThemeContext = React.createContext({
	color: 'secondary',
	changeTheme: () => {},
})

ThemeContext.displayName = 'ThemeContext'

export default ThemeContext
