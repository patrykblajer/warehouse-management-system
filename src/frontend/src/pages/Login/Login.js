import { Form, Formik, ErrorMessage } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import { InputField } from '../../components/UI/FormValidation/InputField'
import { getLoginFormValidationSchema } from '../../components/UI/FormValidation/ValidationSchemas'
import AuthContext from '../../context/AuthContext'
import authHeader from '../../helpers/authHeader'
import { FormContainer, MainContainer, ReadmeContainer, StyledWrapper } from './Login.styled'
import Cookies from 'js-cookie'

const Login = () => {
	let navigate = useNavigate()
	const { isAuthenticated, setIsAuthenticated, appUser, setAppUser } = useContext(AuthContext)
	const [error, setError] = useState('')

	const login = credentials => {
		axios
			.post('/auth/login', credentials)
			.then(response => {
				Cookies.set('token', response.data.token, { secure: true })
				setIsAuthenticated(true)
				getData(credentials.username)
				navigate('/')
			})
			.catch(error => {
				if (error.response.status === 401) {
					setError('Niewłaściwa nazwa użytkownika lub hasło.')
				} else if (error.response.status === 500) {
					setError('Brak odpowiedzi serwera.')
				}
			})
	}

	const getData = async username => {
		return axios
			.get(`/users/${username}`, { headers: authHeader() })
			.then(response => {
				setAppUser(response.data)
			})
			.catch(error => {
				alert(error)
			})
	}

	return (
		<Formik
			onSubmit={credentials => login(credentials)}
			initialValues={{
				username: 'demo',
				password: 'demo',
			}}
			validationSchema={getLoginFormValidationSchema}>
			<StyledWrapper>
				<FormContainer>
					<Form>
						<h1>Warehouse Management System</h1>
						<h2>logowanie do systemu</h2>
						<InputField name='username' type='text' placeholder='login' />
						<InputField name='password' type='password' placeholder='hasło' />
						<Button type='submit' text='Zaloguj się'></Button> {error ? <p>{error}</p> : ''}
					</Form>
				</FormContainer>
				<ReadmeContainer>
					<h1>Eviva l'arte!</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam totam culpa inventore eius repellat quis
						nostrum quibusdam ipsum laboriosam ducimus labore est molestias voluptatem facere quae excepturi odio, eaque
						sed suscipit accusantium atque at id reiciendis. Facilis ea rerum vel.
					</p>
				</ReadmeContainer>
			</StyledWrapper>
		</Formik>
	)
}

export default Login
