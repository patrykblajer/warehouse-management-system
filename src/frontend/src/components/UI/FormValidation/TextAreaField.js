import React, { useId } from 'react'
import { useField } from 'formik'
import { ErrorMessageWrapper } from './ErrorMessageWrapper'
import { Form } from 'react-bootstrap'

export const TextAreaField = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	const id = useId()
	return (
		<>
			<Form.Label htmlFor={id}>{label}</Form.Label>
			<Form.Control
				as='textarea'
				id={id}
				className={`${meta.touched && meta.error}`}
				type='textarea'
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessageWrapper name={field.name}></ErrorMessageWrapper>
		</>
	)
}
