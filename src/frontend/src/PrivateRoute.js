import { useContext } from 'react'
import { Route, Redirect, Navigate } from 'react-router-dom'
import AuthContext from './context/AuthContext'

const PrivateRoute = ({ component: Component }) => {
	const { isAuthenticated } = useContext(AuthContext)
	console.log('gdzie kurwa')
	return isAuthenticated ? <Component /> : <Navigate to='/login' />
}

export default PrivateRoute
