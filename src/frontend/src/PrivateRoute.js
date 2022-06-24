import { Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
const PrivateRoute = ({ component: Component }) => {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Component /> : <Navigate to='/login' />
}

export default PrivateRoute