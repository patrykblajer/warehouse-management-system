import React, { useId } from 'react'
import { useField } from 'formik'
import AsyncSelect from 'react-select/async'
import { ErrorMessageWrapper } from './ErrorMessageWrapper'
import { Form } from 'react-bootstrap'

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
			<Form.Label htmlFor={id}>{label}</Form.Label>
			<Form.Group>
				<AsyncSelect
					id={id}
					className={meta.touched && meta.error}
					{...props}
					cacheOptions
					defaultOptions
					getOptionLabel={e => e.name}
					getOptionValue={e => e.name}
					filterOption={filterOption}
					onChange={onChange}
					onBlur={setTouched}
				/>
			</Form.Group>
			<ErrorMessageWrapper name={field.name}></ErrorMessageWrapper>
		</div>
	)
}
