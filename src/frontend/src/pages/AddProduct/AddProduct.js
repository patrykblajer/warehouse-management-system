import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Butttons/Button'
import axios from '../../axios'
import { useState } from 'react'
import React from 'react'
import AsyncSelect from 'react-select/async'
import style from './AddProduct.module.scss'

const AddProduct = () => {
	const navigate = useNavigate()
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
		e.preventDefault()
		axios
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
			.catch(error => {
				alert(error)
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

	return (
		<form onSubmit={submit} className={style.formProduct}>
			<div className={style.titleBar}>Dane podstawowe</div>
			<div className={style.indexName}>
				<div className='mb-3'>
					<label htmlFor='index' className='form-label'>
						Index produktu:
					</label>
					<input
						id='index'
						onChange={e => handleInput(e)}
						value={newProduct.index}
						type='text'
						className={`form-control ${style.nameIndex}`}
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='name' className='form-label'>
						Nazwa produktu:
					</label>
					<input
						id='name'
						onChange={e => handleInput(e)}
						value={newProduct.name}
						type='text'
						className={`form-control ${style.nameInput}`}
					/>
				</div>
			</div>
			<div className={style.eanCategory}>
				<div className='mb-3'>
					<label htmlFor='ean' className='form-label'>
						Kod EAN:
					</label>
					<input
						id='ean'
						onChange={e => handleInput(e)}
						value={newProduct.ean}
						type='text'
						className={`form-control ${style.eanInput}`}
					/>
				</div>
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
				<div className='mb-3'>
					<label htmlFor='unit' className='form-label'>
						Jednostka miary:
					</label>
					<AsyncSelect
						id='unit'
						onChange={value => changeHandler(value, 'unit')}
						className={style.unitSelector}
						placeholder='Wybierz j.m.'
						cacheOptions
						defaultOptions
						getOptionLabel={e => e.name}
						getOptionValue={e => e.name}
						loadOptions={fetchUnits}
						filterOption={filterOption}
					/>
				</div>
			</div>
			<div className='mb-3'>
				<label htmlFor='contractor' className='form-label'>
					Dostawca:
				</label>
				<AsyncSelect
					id='contractor'
					onChange={value => changeHandler(value, 'contractor')}
					className={style.contractorSelector}
					placeholder='Wybierz dostawcę'
					cacheOptions
					defaultOptions
					getOptionLabel={e => e.name}
					getOptionValue={e => e.name}
					// loadOptions={fetchContractors}
					filterOption={filterOption}
					isDisabled={true}
				/>
			</div>
			<div className={style.titleBar}>Dane składowania</div>
			<div className='mb-3'>
				<label htmlFor='packagingType' className='form-label'>
					Opakowanie jednostkowe:
				</label>
				<AsyncSelect
					id='packagingType'
					onChange={value => changeHandler(value, 'packagingType')}
					className={style.packagingTypeSelector}
					placeholder='Wybierz op. jednostkowe'
					cacheOptions
					defaultOptions
					getOptionLabel={e => e.name}
					getOptionValue={e => e.name}
					loadOptions={fetchPackagingType}
					filterOption={filterOption}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='inCollectivePackage' className='form-label'>
					Ilość w opakowaniu zbiorczym:
				</label>
				<input
					id='inCollectivePackage'
					onChange={e => handleInput(e)}
					value={newProduct.inCollectivePackage}
					type='number'
					className={`form-control ${style.nameIndex}`}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='stackedOnPallet' className='form-label'>
					Ilość na palecie:
				</label>
				<input
					id='stackedOnPallet'
					onChange={e => handleInput(e)}
					value={newProduct.stackedOnPallet}
					type='number'
					className={`form-control ${style.nameIndex}`}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='palletType' className='form-label'>
					Preferowany rodzaj palety:
				</label>
				<AsyncSelect
					id='palletType'
					onChange={value => changeHandler(value, 'preferredPalletType')}
					className={style.palletTypeSelector}
					placeholder='Wybierz rodzaj palety'
					cacheOptions
					defaultOptions
					required={true}
					getOptionLabel={e => e.name}
					getOptionValue={e => e.name}
					loadOptions={fetchPallets}
					filterOption={filterOption}
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='minimumLevelOfStocks' className='form-label'>
					Minimalny poziom zapasów:
				</label>
				<input
					id='minimumLevelOfStocks'
					onChange={e => handleInput(e)}
					value={newProduct.minimumLevelOfStocks}
					type='number'
					required={true}
					className={`form-control ${style.minimumLevelOfStocks}`}
				/>
			</div>
			<div className={style.titleBar}>Dane uzupełniające</div>
			<div className='mb-3'>
				<div className='form-check'>
					<input className='form-check-input' type='checkbox' value='' id='flexCheckDefault'></input>
					<label className='form-check-label' htmlFor='flexCheckDefault'>
						Aktywny
					</label>
				</div>
				<div className='mb-3'>
					<label htmlFor='description' className='form-label'>
						Uwagi
					</label>
					<textarea
						id='description'
						onChange={e => handleInput(e)}
						value={newProduct.description}
						className='form-control'
						rows={5}
						cols={65}></textarea>
				</div>
			</div>
			<div>
				<Button type='submit' text='Zapisz'></Button>
			</div>
		</form>
	)
}

export default AddProduct
