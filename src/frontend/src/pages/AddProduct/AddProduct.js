import axios from '../../axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
	const navigate = useNavigate()
	const [newProduct, setNewProduct] = useState({
		index: '',
		name: '',
		ean: '',
		category: 'elektryka',
	})

	const submit = async e => {
		e.preventDefault()
		axios
			.post('http://localhost:8080/api/v1/products', {
				index: newProduct.index,
				name: newProduct.name,
				ean: newProduct.ean,
				category: 'elektryka',
			})
			.catch(error => {
				alert(error)
			})
		console.log(newProduct)
		navigate('/products')
	}

	const handle = e => {
		const data = { ...newProduct }
		data[e.target.id] = e.target.value
		setNewProduct(data)
	}

	return (
		<form onSubmit={submit}>
			<div className='mb-3'>
				<label htmlFor='productIndex' className='form-label'>
					Indeks produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.index} type='text' className='form-control' id='index' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productName' className='form-label'>
					Nazwa produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.name} type='text' className='form-control' id='name' />
			</div>
			<div className='mb-3'>
				<label htmlFor='productEan' className='form-label'>
					Ean produktu:
				</label>
				<input onChange={e => handle(e)} value={newProduct.ean} type='text' className='form-control' id='ean' />
			</div>
			<button type='submit' className='btn btn-primary'>
				Wyślij
			</button>
		</form>
	)
}

export default AddProduct
