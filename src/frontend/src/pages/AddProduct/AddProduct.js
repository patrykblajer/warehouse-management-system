import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import style from './AddProduct.module.scss'
import { Formik, Form } from 'formik'
import { TextField as InputField } from '../../components/UI/FormValidation/InputField'
import { SelectField } from '../../components/UI/FormValidation/SelectField'
import * as Yup from 'yup'

const AddProduct = () => {
	const navigate = useNavigate()
	let [errorData, setErrorData] = useState([])

	const availableRules = {
		required: { message: 'Pole jest wymagane.' },
		maxLength: { max: 15, message: 'Przekroczono dopuszczalną ilość znaków.' },
		maxTwoDecimalPlaces: {
			regex: /^\d+(\.\d{1,2})?$/,
			message: 'Dopuszczalna wartość do drugiego miejsca po przecinku.',
		},
		maxNumber: {
			max: 8,
			message: 'Podana wartość jest nieprawidłowa.',
		},
	}

	const submit = values => {
		axios.post('/products', values).catch(err => {
			setErrorData(err.response.data.errors)
		})
		navigate('/products')
	}

	const fetchSelectOptions = async endPoint => {
		return await axios.get(`${endPoint}`).then(result => {
			return result.data
		})
	}

	const validate = Yup.object({
		name: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),
		index: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),
		ean: Yup.string()
			.max(availableRules.maxLength.max, availableRules.maxLength.message)
			.required(availableRules.required.message),

		category: Yup.string().required(availableRules.required.message),
		unit: Yup.string().required(availableRules.required.message),
		packagingType: Yup.string().required(availableRules.required.message),
		preferredPalletType: Yup.string().required(availableRules.required.message),
		inCollectivePackage: Yup.string()
			.required(availableRules.required.message)
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
		stackedOnPallet: Yup.string()
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
		minimumLevelOfStocks: Yup.string()
			.matches(availableRules.maxTwoDecimalPlaces.regex, availableRules.maxTwoDecimalPlaces.message)
			.max(availableRules.maxNumber.max, availableRules.maxNumber.message),
	})

	return (
		<Formik
			onSubmit={values => submit(values)}
			className={style.formProduct}
			initialValues={{
				index: '',
				name: '',
				ean: '',
				category: '',
				unit: '',
				packagingType: '',
				inCollectivePackage: '',
				stackedOnPallet: '',
				minimumLevelOfStocks: '',
				preferredPalletType: '',
			}}
			validationSchema={validate}>
			{formik => (
				<Form>
					<div className={style.titleBar}>Dane podstawowe</div>
					<div className={style.indexName}></div>
					<InputField label='Index' name='index' type='text' />
					<InputField label='Nazwa' name='name' type='text' />
					<InputField label='Numer EAN' name='ean' type='text' />
					<SelectField
						label='Kategoria'
						name='category'
						className={style.categorySelector}
						placeholder='Wybierz kategorię'
						loadOptions={() => fetchSelectOptions('/categories')}
					/>
					<SelectField
						label='Jednostka miary'
						name='unit'
						className={style.categorySelector}
						placeholder='Wybierz jednostkę'
						loadOptions={() => fetchSelectOptions('/units')}
					/>
					<SelectField
						label='Typ opakowania'
						name='packagingType'
						className={style.categorySelector}
						placeholder='Wybierz opakowanie'
						loadOptions={() => fetchSelectOptions('/packagingtype')}
					/>
					<SelectField
						label='Preferowany typ palety'
						name='preferredPalletType'
						className={style.categorySelector}
						placeholder='Wybierz rodzaj palety'
						loadOptions={() => fetchSelectOptions('/pallets')}
					/>
					<InputField
						label='Ilość w opakowaniu zbiorczym'
						min='0'
						step='any'
						name='inCollectivePackage'
						type='number'
					/>
					<InputField label='Ilość opakowań na palecie' min='0' step='any' name='stackedOnPallet' type='number' />
					<InputField label='Minimalny poziom zapasów' min='0' step='any' name='minimumLevelOfStocks' type='number' />
					<div>
						<Button type='submit' text='Zapisz'></Button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddProduct
