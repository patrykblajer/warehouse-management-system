import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AsyncSelect from 'react-select/async'
import axios from '../../axios'
import Button from '../../components/UI/Butttons/Button'
import style from './AddProduct.module.scss'
import { Formik, Form } from 'formik'
import { TextField } from '../../components/UI/TextField/TextField'
import * as Yup from 'yup'

const AddProduct = () => {
	const navigate = useNavigate()
	let [errorData, setErrorData] = useState([])
	const [newProduct, setNewProduct] = useState({
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
		description: '',
	})

	const submit = async e => {
		// e.preventDefault()
		let res = axios
			.post('/products', {
				index: newProduct.index,
				name: newProduct.name,
				ean: newProduct.ean,
				category: newProduct.category,
				unit: newProduct.unit,
				packagingType: newProduct.packagingType,
				inCollectivePackage: newProduct.inCollectivePackage,
				stackedOnPallet: newProduct.stackedOnPallet,
				minimumLevelOfStocks: newProduct.minimumLevelOfStocks,
				preferredPalletType: newProduct.preferredPalletType,
				description: newProduct.description,
			})
			.catch(err => {
				setErrorData(err.response.data.errors)
			})
		navigate('/products')
	}

	const handleInput = e => {
		const data = { ...newProduct }
		data[e.target.id] = e.target.value
		setNewProduct(data)
	}

	const changeHandler = (value, fieldName) => {
		const data = { ...newProduct }
		data[fieldName] = value.name
		setNewProduct(data)
	}

	const fetchCategories = async () => {
		return await axios.get('/categories').then(result => {
			return result.data
		})
	}

	const fetchPackagingType = async () => {
		return await axios.get('/packagingtype').then(result => {
			return result.data
		})
	}

	const fetchUnits = async () => {
		return await axios.get('/units').then(result => {
			return result.data
		})
	}

	const fetchPallets = async () => {
		return await axios.get('/pallets').then(result => {
			return result.data
		})
	}

	const filterOption = (candidate, input) => {
		return candidate.data.__isNew__ || candidate.label.includes(input)
	}

	const validate = Yup.object({
		name: Yup.string()
			.max(15, 'max 10 char')
			.required('Required'),
		index: Yup.string()
			.max(15, 'max 10 char')
			.required('Required'),
		ean: Yup.string()
			.max(15, 'max 10 char')
			.required('Required'),
	})

	return (
		<Formik
			onSubmit={submit}
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
				description: '',
			}}
			validationSchema={validate}>
			{formik => (
				<Form>
					<div className={style.titleBar}>Dane podstawowe</div>
					<div className={style.indexName}></div>
					<TextField label='index' name='index' type='text'></TextField>
					<TextField label='name' name='name' type='text'></TextField>
					<TextField label='ean' name='ean' type='text'></TextField>
					<div className='mb-3'>
						<label htmlFor='category' className='form-label'>
							Kategoria:
						</label>
						<AsyncSelect
							id='category'
							onChange={value => changeHandler(value, 'category')}
							className={style.categorySelector}
							placeholder='Wybierz kategorię'
							cacheOptions
							defaultOptions
							getOptionLabel={e => e.name}
							getOptionValue={e => e.name}
							loadOptions={fetchCategories}
							filterOption={filterOption}
						/>
					</div>
					<div>
						<Button type='submit' text='Zapisz'></Button>
						<Button type='reset' text='Reset'></Button>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default AddProduct
