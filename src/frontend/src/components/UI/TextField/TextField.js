import React from 'react'
import { ErrorMessage, useField } from 'formik'
import style from '../../../pages/AddProduct/AddProduct.module.scss'

export const TextField = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div className='mb-2'>
			<label htmlFor={field.name}>{label}</label>
			<input className={`form-control shadow-none`} {...field} {...props} autoComplete='off'></input>
			<ErrorMessage name={field.name}></ErrorMessage>
		</div>
	)
}
