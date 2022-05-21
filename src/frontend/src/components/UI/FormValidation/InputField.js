import React, { useId } from 'react'
import { useField } from 'formik'
import { ErrorMessageWrapper } from './ErrorMessageWrapper'

export const InputField = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	const id = useId()
	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessageWrapper name={field.name}></ErrorMessageWrapper>
		</div>
	)
}
