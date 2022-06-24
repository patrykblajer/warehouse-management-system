import { Form, Formik } from 'formik'
import Button from '../../components/UI/Butttons/Button'
import { InputField } from '../../components/UI/FormValidation/InputField'
import { getLoginFormValidationSchema } from '../../components/UI/FormValidation/ValidationSchemas'
import useAuth from '../../hooks/useAuth'
import { FormContainer, ReadmeContainer, StyledWrapper } from './Login.styled'

const Login = () => {
	const { login, error } = useAuth()

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
					<h1>README</h1>
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