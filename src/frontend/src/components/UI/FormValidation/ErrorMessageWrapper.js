import React from 'react'
import { ErrorMessage } from 'formik'

export const ErrorMessageWrapper = props => {
	return <ErrorMessage component='div' {...props} className='text-danger small' />
}
