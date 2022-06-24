import { useId } from 'react'
import { useField } from 'formik'
import { ErrorMessageWrapper } from './ErrorMessageWrapper'
import { Form } from 'react-bootstrap'

export const InputField = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	const id = useId()
	return (
		<>
			<Form.Label htmlFor={id}>{label}</Form.Label>
			<Form.Control
				id={id}
				className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessageWrapper name={field.name}></ErrorMessageWrapper>
		</>
	)
}