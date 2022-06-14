import axios from '../../axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import authHeader from '../../helpers/authHeader'

const Login = () => {
	let navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { isAuthenticated, setIsAuthenticated, user, setUser, firstName, setFirstName, lastName, setLastName } =
		useContext(AuthContext)

	const login = async e => {
		e.preventDefault()
		return axios
			.post('/auth/login', {
				username,
				password,
			})
			.then(response => {
				localStorage.setItem('token-data', response.data.token)
				setIsAuthenticated(true)
				setUser(username)
				navigate('/')
			})
			.catch(error => {
				alert(error)
			})
			.finally(getData(username))
	}

	const getData = async username => {
		return axios
			.get(`/users/${username}}`, { headers: authHeader() })
			.then(response => {
				setFirstName(response.data.firstName)
				setLastName(response.data.lastName)
			})
			.catch(error => {
				alert(error)
			})
	}

	return (
		<form onSubmit={login}>
			<label htmlFor='username'>username</label>
			<input type='text' value={username} onChange={e => setUsername(e.target.value)} id='username'></input>

			<label htmlFor='password'>password</label>
			<input type='password' value={password} onChange={e => setPassword(e.target.value)} id='password'></input>

			<button type='submit'>login</button>
		</form>
	)
}

export default Login
