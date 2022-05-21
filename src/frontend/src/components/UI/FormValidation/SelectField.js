import React, { useId } from 'react'
import { useField } from 'formik'
import AsyncSelect from 'react-select/async'
import { ErrorMessageWrapper } from './ErrorMessageWrapper'

export const SelectField = ({ label, ...props }) => {
	const [field, meta, { setValue, setTouched }] = useField(props)
	const id = useId()
	const onChange = value => {
		setValue(value.name)
	}

	const filterOption = (candidate, input) => {
		return candidate.data.__isNew__ || candidate.label.includes(input)
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<AsyncSelect
				id={id}
				className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
				{...props}
				cacheOptions
				defaultOptions
				getOptionLabel={e => e.name}
				getOptionValue={e => e.name}
				filterOption={filterOption}
				onChange={onChange}
				onBlur={setTouched}
			/>
			<ErrorMessageWrapper name={field.name}></ErrorMessageWrapper>
		</div>
	)
}
