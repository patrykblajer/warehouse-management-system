import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import style from './AddProduct.module.scss'
import { Formik, Form } from 'formik'
import { InputField } from '../../components/UI/FormValidation/InputField'
import { SelectField } from '../../components/UI/FormValidation/SelectField'
import { getProductFormValidationSchema } from '../../components/UI/FormValidation/ValidationSchemas'

const AddProduct = () => {
	const navigate = useNavigate()
	let [errorData, setErrorData] = useState([])

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
			validationSchema={getProductFormValidationSchema}>
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
