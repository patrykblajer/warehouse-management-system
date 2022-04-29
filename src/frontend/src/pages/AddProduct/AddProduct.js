import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Butttons/Button'
import axios from '../../axios'
import { useState } from 'react'
import React from 'react'
import AsyncSelect from 'react-select/async'

const AddProduct = () => {
	const navigate = useNavigate()
	const [newProduct, setNewProduct] = useState({
		index: '',
		name: '',
		ean: '',
		category: '',
	})

	const submit = async e => {
		e.preventDefault()
		axios
			.post('/products', {
				index: newProduct.index,
				name: newProduct.name,
				ean: newProduct.ean,
				category: newProduct.category,
			})
			.catch(error => {
				alert(error)
			})
		console.log(newProduct)
		navigate('/products')
	}

	const handleInput = e => {
		const data = { ...newProduct }
		data[e.target.id] = e.target.value
		setNewProduct(data)
	}

	const handleSelect = value => {
		newProduct.category = value.name
	}

	const fetchCategories = async () => {
		return await axios.get('/categories').then(result => {
			return result.data
		})
	}

	const filterOption = (candidate, input) => {
		return candidate.data.__isNew__ || candidate.label.includes(input)
	}

	return (
		<form onSubmit={submit}>
			<div className='mb-3'>
				<label htmlFor='productIndex' className='form-label'>
					Indeks produktu:
				</label>
				<input
					onChange={e => handleInput(e)}
					value={newProduct.index}
					type='text'
					className='form-control'
					id='index'
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='productName' className='form-label'>
					Nazwa produktu:
				</label>
				<input onChange={e => handleInput(e)} value={newProduct.name} type='text' className='form-control' id='name' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productEan' className='form-label'>
					Ean produktu:
				</label>
				<input onChange={e => handleInput(e)} value={newProduct.ean} type='text' className='form-control' id='ean' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productEan' className='form-label'>
					Kategoria:
				</label>
				<AsyncSelect
					placeholder='Wybierz kategorię'
					cacheOptions
					defaultOptions
					getOptionLabel={e => e.name}
					getOptionValue={e => e.name}
					loadOptions={fetchCategories}
					onChange={handleSelect}
					filterOption={filterOption}
				/>
			</div>
			<Button type='submit' text='Zapisz'></Button>
		</form>
	)
}

export default AddProduct
